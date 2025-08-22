import { Logger } from "@/utils/logger";
import { ID } from "react-native-appwrite";
import { appwriteConfig, databases, storage } from "./appwrite";
import dummyData from "./data";

interface SeedError extends Error {
  operation?: string;
  details?: unknown;
}

interface Category {
  name: string;
  description: string;
}

interface Customization {
  name: string;
  price: number;
  type: "topping" | "side" | "size" | "crust" | string;
}

interface MenuItem {
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  calories: number;
  protein: number;
  category_name: string;
  customizations: string[];
}

interface DummyData {
  categories: Category[];
  customizations: Customization[];
  menu: MenuItem[];
}

const data = dummyData as DummyData;

async function clearAll(collectionId: string): Promise<void> {
  const list = await databases.listDocuments(
    appwriteConfig.databaseId,
    collectionId
  );

  await Promise.all(
    list.documents.map((doc) =>
      databases.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
    )
  );
}

async function clearStorage(): Promise<void> {
  const list = await storage.listFiles(appwriteConfig.bucketId);

  await Promise.all(
    list.files.map((file) =>
      storage.deleteFile(appwriteConfig.bucketId, file.$id)
    )
  );
}

async function uploadImageToStorage(imageUrl: string): Promise<string | null> {
  try {
    // Validate input
    if (!imageUrl) {
      throw new Error("No image URL provided.");
    }

    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image. Status: ${response.status}`);
    }

    const blob = await response.blob();
    if (!blob || !blob.size) {
      throw new Error("Fetched image is empty or invalid.");
    }

    // Build file object
    const fileObj = {
      name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
      type: blob.type || "image/jpeg", // fallback MIME type
      size: blob.size,
      uri: imageUrl,
    };

    // Upload to Appwrite storage
    const file = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      fileObj
    );

    // Return the file view URL
    return storage.getFileViewURL(appwriteConfig.bucketId, file.$id);

  } catch (error) {
    console.error("Image upload failed:", error);
    return null; // return null instead of crashing
  }
}

async function seed(): Promise<void> {
  const startTime = Date.now();
  let operation = "initialization";

  try {
    console.log("🌱 Seed starting...");

    operation = "clear data";
    console.log("🗑️  Clearing existing data...");

    await Promise.allSettled([
      clearAll(appwriteConfig.categoriesCollectionId).catch((e) => {
        throw new Error(`Failed to clear categories: ${e.message}`);
      }),
      clearAll(appwriteConfig.customizationsCollectionId).catch((e) => {
        throw new Error(`Failed to clear customizations: ${e.message}`);
      }),
      clearAll(appwriteConfig.menuCollectionId).catch((e) => {
        throw new Error(`Failed to clear menu: ${e.message}`);
      }),
      clearAll(appwriteConfig.menuCustomizationsCollectionId).catch((e) => {
        throw new Error(`Failed to clear menu customizations: ${e.message}`);
      }),
      clearStorage().catch((e) => {
        throw new Error(`Failed to clear storage: ${e.message}`);
      }),
    ]);

    // 2. Create Categories
    operation = "create categories";
    console.log("📁 Creating categories...");
    const categoryMap: Record<string, string> = {};

    for (const [index, cat] of data.categories.entries()) {
      try {
        const doc = await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.categoriesCollectionId,
          ID.unique(),
          cat
        );
        categoryMap[cat.name] = doc.$id;
        console.log(
          `✅ Created category ${index + 1}/${data.categories.length}: ${cat.name}`
        );
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `Failed to create category "${cat.name}": ${error.message}`
        );
      }
    }

    // 3. Create Customizations
    operation = "create customizations";
    console.log("⚙️  Creating customizations...");
    const customizationMap: Record<string, string> = {};

    for (const [index, cus] of data.customizations.entries()) {
      try {
        const doc = await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.customizationsCollectionId,
          ID.unique(),
          {
            name: cus.name,
            price: cus.price,
            type: cus.type,
          }
        );
        customizationMap[cus.name] = doc.$id;
        console.log(
          `✅ Created customization ${index + 1}/${data.customizations.length}: ${cus.name}`
        );
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `Failed to create customization "${cus.name}": ${error.message}`
        );
      }
    }

    // 4. Create Menu Items
    operation = "create menu items";
    console.log("🍔 Creating menu items...");
    const menuMap: Record<string, string> = {};

    for (const [index, item] of data.menu.entries()) {
      try {
        operation = `upload image for ${item.name}`;
        const uploadedImage = await uploadImageToStorage(item.image_url);

        operation = `create menu item ${item.name}`;
        const doc = await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.menuCollectionId,
          ID.unique(),
          {
            name: item.name,
            description: item.description,
            image_url: uploadedImage,
            price: item.price,
            rating: item.rating,
            calories: item.calories,
            protein: item.protein,
            categories: categoryMap[item.category_name],
          }
        );

        menuMap[item.name] = doc.$id;
        console.log(
          `✅ Created menu item ${index + 1}/${data.menu.length}: ${item.name}`
        );

        // 5. Create menu_customizations
        operation = `create customizations for ${item.name}`;
        if (item.customizations && item.customizations.length > 0) {
          const customizationPromises = item.customizations.map(
            async (cusName, cusIndex) => {
              if (!customizationMap[cusName]) {
                throw new Error(
                  `Customization "${cusName}" not found for menu item "${item.name}"`
                );
              }

              return databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.menuCustomizationsCollectionId,
                ID.unique(),
                {
                  menu: doc.$id,
                  customizations: customizationMap[cusName],
                }
              );
            }
          );

          await Promise.all(customizationPromises);
          console.log(
            `   ↳ Added ${item.customizations.length} customizations`
          );
        }
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `Failed to process menu item "${item.name}" (${operation}): ${error.message}`
        );
      }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n✅ Seeding complete in ${duration}s!`);
    console.log(
      `📊 Created: ${data.categories.length} categories, ${data.customizations.length} customizations, ${data.menu.length} menu items`
    );
  } catch (e) {
    const error = e as Error;
    const seedError: SeedError = new Error(
      `Seed failed during ${operation}: ${error.message}`
    );
    seedError.operation = operation;
    seedError.details = error;

    Logger.error("🌱 Seed failed", {
      operation,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    console.error(`\n❌ Seed failed during: ${operation}`);
    console.error(`📋 Error: ${error.message}`);

    // Re-throw to allow calling code to handle the failure
    throw seedError;
  }
}

export default seed;
