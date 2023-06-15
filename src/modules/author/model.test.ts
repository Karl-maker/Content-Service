import AuthorModel from "./model";
import config from "../../config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { service } = config;

describe('AuthorModel', () => {
  beforeAll(async () => {
    await mongoose.connect(service.content.test_db.url);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await AuthorModel.model.deleteMany();
  });

  it('Should create new author with all data', async () => {

    const data = {
      first_name: "Bill",
      last_name: "Taylor",
      email: "bill@example.com",
      hash_password: "password123",
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

    const hash_password = data.hash_password

    // create author
    const author = await AuthorModel.create(data);

    // find author
    const found_author = await AuthorModel.findById(author._id);

    // match result
    expect(found_author).toBeDefined();
    expect(found_author?.first_name).toBe(author.first_name);
    expect(found_author?.last_name).toBe(author.last_name);
    expect(found_author?.email).toBe(author.email);
    expect(await bcrypt.compare(hash_password, found_author?.hash_password)).toBeTruthy();
    expect(found_author?.description).toBe(author.description);
    expect(found_author?.display_image_url).toBe(author.display_image_url);
    expect(found_author?.description).toBe(author.description);
    expect(found_author?.owner_id).toBe(author.owner_id);
    expect(found_author?.social_media_handles[0].url).toBe(author.social_media_handles[0].url);
    expect(found_author?.social_media_handles[0].name).toBe(author.social_media_handles[0].name);
    expect(found_author?.social_media_handles[0].platform).toBe(author.social_media_handles[0].platform);
  });

  it('Should create new author with required data only', async () => {

    const data = {
      first_name: "Bill",
      last_name: "Taylor",
      email: "bill@example.com",
      hash_password: "password123",
    };

    const hash_password = data.hash_password

    // create author
    const author = await AuthorModel.create(data);

    // find author
    const found_author = await AuthorModel.findById(author._id);

    // match result
    expect(found_author).toBeDefined();
    expect(found_author?.first_name).toBe(author.first_name);
    expect(found_author?.last_name).toBe(author.last_name);
    expect(found_author?.email).toBe(author.email);
    expect(await bcrypt.compare(hash_password, found_author?.hash_password)).toBeTruthy();
    expect(found_author?.description).toBeUndefined();
    expect(found_author?.display_image_url).toBeUndefined();
    expect(found_author?.owner_id).toBe("");
    expect(found_author?.social_media_handles).toHaveLength(0);
  });

  it("Should find authors by query", async () => {
    // Create mock authors
    const data_1 = {
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      hash_password: "password123",
    };
    const data_2 = {
      first_name: "Jane",
      last_name: "Smith",
      email: "jane@example.com",
      hash_password: "password123",
    };

    const hash_password_1 = data_1.hash_password;

    await AuthorModel.create(data_1);
    await AuthorModel.create(data_2);

    // Find authors by query
    const query = { first_name: "John" };
    const found_authors = await AuthorModel.find(query);

    expect(found_authors.length).toBe(1);
    expect(found_authors[0].first_name).toBe(data_1.first_name);
    expect(found_authors[0].last_name).toBe(data_1.last_name);
    expect(found_authors[0].email).toBe(data_1.email);
    expect(await bcrypt.compare(hash_password_1, found_authors[0].hash_password)).toBeTruthy();
  });

  it("Should delete an author", async () => {
    // Create a mock author
    const data = {
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      hash_password: "password123",
    };
    const author = await AuthorModel.create(data);

    // Delete the author
    await AuthorModel.delete(author._id);

    // Try to find the deleted author
    const deleted_author = await AuthorModel.findById(author._id);

    expect(deleted_author).toBeNull();
  });

  it("Should update an author", async () => {
    // Create a mock author
    const data = {
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      hash_password: "password123",
    };

    const author = await AuthorModel.create(data);

    // Update the author
    const updated_data = {
      first_name: "John",
      last_name: "Smith",
      email: "john@example.com",
      hash_password: "newpassword",
    };
    const hash_password = updated_data.hash_password;
    await AuthorModel.update(author._id, updated_data);

    // Find the updated author
    const updated_author = await AuthorModel.findById(author._id);

    expect(updated_author).toBeDefined();
    expect(updated_author?.first_name).toBe(updated_data.first_name);
    expect(updated_author?.last_name).toBe(updated_data.last_name);
    expect(updated_author?.email).toBe(updated_data.email);
    expect(await bcrypt.compare(hash_password, updated_author?.hash_password)).toBeTruthy();
  });
});
