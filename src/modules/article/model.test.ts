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
      authors: ["dx00312#H2A02LKPONS9", "dx043BDN#8432NLPP0X"],
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
    expect(found_article.authors).toEqual(data.authors);
    expect(found_article.status).toEqual(data.status);
    expect(found_article.created_at).toEqual(data.created_at);
    expect(found_article.updated_at).toEqual(data.updated_at);
  });

});