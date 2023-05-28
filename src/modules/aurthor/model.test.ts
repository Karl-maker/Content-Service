import ArticleModel from "./model";
import config from "../../config";
import mongoose from "mongoose";

const { service } = config;

describe('ArticleModel', () => {
  beforeAll(async () => {
    await mongoose.connect(service.content.db.url);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await ArticleModel.model.deleteMany();
  });

  it('Should create new article with all data', async () => {

    const data = {
      first_name: "Bill",
      last_name: "Taylor",
      description: "Bill is a talented writer who specializes in political discourse centered around Trinidad. With a keen understanding of the local political landscape, Bill provides insightful commentary and analysis on various political issues in Trinidad. Through his engaging writing style and comprehensive knowledge of politics, Bill brings attention to important topics, sheds light on significant events, and offers thought-provoking perspectives. His writings contribute to fostering a well-informed public discourse and promote a deeper understanding of the political dynamics in Trinidad.",
      display_image_url: "https://aws:lorpsom/bill-taylor.png",
      social_media_handles: [
        {
          url: "https://facebook.com/bill-taylor",
          name: "BillT",
          platform: "Facebook"
        }
      ],
      owner_id: "dx00312#H2A02LKPONS9"
    };

    // create article

    const article = await ArticleModel.create(data);

    // find article

    const found_article = await ArticleModel.findById(article.id);

    // match result

    expect(found_article).toBeDefined();
    expect(found_article.first_name).toBe(article.first_name);
    expect(found_article.last_name).toBe(article.last_name);
    expect(found_article.description).toBe(article.description);
    expect(found_article.display_image_url).toBe(article.display_image_url);
    expect(found_article.description).toBe(article.description);
    expect(found_article.owner_id).toBe(article.owner_id);
    expect(found_article.social_media_handles[0].url).toBe(article.social_media_handles[0].url);
    expect(found_article.social_media_handles[0].name).toBe(article.social_media_handles[0].name);
    expect(found_article.social_media_handles[0].platform).toBe(article.social_media_handles[0].platform);
  });

  it('Should create new article without un-required data', async () => {

    const data = {
      first_name: "Bill",
      last_name: "Taylor",
    };

    // create article

    const article = await ArticleModel.create(data);

    // find article

    const found_article = await ArticleModel.findById(article.id);

    // match result

    expect(found_article).toBeDefined();
    expect(found_article.first_name).toBe(article.first_name);
    expect(found_article.last_name).toBe(article.last_name);
    expect(found_article.description).toBe(article.description);
    expect(found_article.owner_id).toBe("");
  });

});
