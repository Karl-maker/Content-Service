import ArticleModel from "./model";
import config from "../../config";
import mongoose from "mongoose";

const { service } = config;

describe('ArticleModel', () => {
    beforeAll(async () => {
        await mongoose.connect(service.content.test_db.url);
      });
    
      afterAll(async () => {
        await mongoose.disconnect();
      });
    
      beforeEach(async () => {
        await ArticleModel.model.deleteMany();
      });
    

  it("Should create article", async () => {
    const data = {
      headline: "Sample Article",
      subheadline: "A short description of the article",
      categories: ["News", "Politics"],
      feature_image_url: "https://aws/image.jpg",
      elements: [
        {
          element_type: "paragraph",
          markdown: "This is the first paragraph of the article.",
        },
        {
          element_type: "image",
          url: "https://example.com/image2.jpg",
          caption: "An image related to the article"
        },
      ],
      author_ids: ["dx00312#H2A02LKPONS9", "dx043BDN#8432NLPP0X"],
      status: {
        status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
      },
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Create article
    const article = await ArticleModel.create(data);

    // Find article
    const found_article = await ArticleModel.findById(article.id);

    expect(found_article).toBeDefined();
    expect(found_article.headline).toBe(data.headline);
    expect(found_article.subheadline).toBe(data.subheadline);
    expect(found_article.categories).toEqual(data.categories);
    expect(found_article.feature_image_url).toBe(data.feature_image_url);
    expect(found_article.elements).toEqual(data.elements);
    expect(found_article.author_ids).toEqual(data.author_ids);
    expect(found_article.status).toEqual(data.status);
    expect(found_article.created_at).toEqual(data.created_at);
    expect(found_article.updated_at).toEqual(data.updated_at);
  });

  it("Should delete article", async () => {
    const data = {
      headline: "Sample Article",
      subheadline: "A short description of the article",
      categories: ["News", "Politics"],
      feature_image_url: "https://aws/image.jpg",
      elements: [
        {
          element_type: "paragraph",
          markdown: "This is the first paragraph of the article.",
        },
        {
          element_type: "image",
          url: "https://example.com/image2.jpg",
          caption: "An image related to the article",
        },
      ],
      author_ids: ["dx00312#H2A02LKPONS9", "dx043BDN#8432NLPP0X"],
      status: {
        status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
      },
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Create article
    const article = await ArticleModel.create(data);

    // Delete article
    const result = await ArticleModel.delete(article.id);

    expect(result.deletedCount).toBe(1);

    // Ensure article is no longer found
    const deleted_article = await ArticleModel.findById(article.id);
    expect(deleted_article).toBeNull();
  });

  it("Should update article", async () => {
    const data = {
      headline: "Sample Article",
      subheadline: "A short description of the article",
      categories: ["News", "Politics"],
      feature_image_url: "https://aws/image.jpg",
      elements: [
        {
          element_type: "paragraph",
          markdown: "This is the first paragraph of the article.",
        },
        {
          element_type: "image",
          url: "https://example.com/image2.jpg",
          caption: "An image related to the article",
        },
      ],
      author_ids: ["dx00312#H2A02LKPONS9", "dx043BDN#8432NLPP0X"],
      status: {
        status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
      },
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Create article
    const article = await ArticleModel.create(data);

    // Update article
    const updated_data = {
      headline: "Updated Article",
      subheadline: "An updated description of the article",
      categories: ["News", "Technology"],
      feature_image_url: "https://aws/updated-image.jpg",
      elements: [
        {
          element_type: "paragraph",
          markdown: "This is an updated paragraph of the article.",
        },
        {
          element_type: "image",
          url: "https://example.com/updated-image.jpg",
          caption: "An updated image related to the article",
        },
      ],
      author_ids: ["dx00312#H2A02LKPONS9", "dx043BDN#8432NLPP0X", "dx0493#P3X293NS"],
    };

    await ArticleModel.update(article.id, updated_data);

    const updated_article = await ArticleModel.findById(article._id);

    expect(updated_article).toBeDefined();
    expect(updated_article.headline).toBe(updated_data.headline);
    expect(updated_article.subheadline).toBe(updated_data.subheadline);
    expect(updated_article.categories).toEqual(updated_data.categories);
    expect(updated_article.feature_image_url).toBe(updated_data.feature_image_url);
    expect(updated_article.elements).toEqual(updated_data.elements);
    expect(updated_article.author_ids).toEqual(updated_data.author_ids);
    expect(updated_article.status).toEqual(article.status);
    expect(updated_article.created_at).toEqual(article.created_at);
    expect(updated_article.updated_at).not.toEqual(article.updated_at);
  });

  it("Should find all articles by query", async () => {
    const data1 = {
      headline: "Article 1",
      subheadline: "Description 1",
      categories: ["News"],
      feature_image_url: "https://aws/image1.jpg",
      elements: [],
      author_ids: ["dx00312#H2A02LKPONS9"],
      status: {
        status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
      },
      created_at: new Date(),
      updated_at: new Date(),
    };

    const data2 = {
      headline: "Article 2",
      subheadline: "Description 2",
      categories: ["Politics"],
      feature_image_url: "https://aws/image2.jpg",
      elements: [],
      author_ids: ["dx043BDN#8432NLPP0X"],
      status: {
        status: "approved",
        created_at: new Date(),
        updated_at: new Date(),
      },
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Create articles
    await ArticleModel.create(data1);
    await ArticleModel.create(data2);

    // Find all articles
    const articles = await ArticleModel.find({ headline: data1.headline });

    expect(articles).toHaveLength(1);
    expect(articles[0].headline).toBe(data1.headline);
  });

});