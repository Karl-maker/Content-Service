import mongoose, { Schema } from 'mongoose';
import BaseModel, { IResponse } from '../base/model';
import { IUser, userSchema, User } from '../user/model';
import bcrypt from "bcrypt";

interface ISocialMediaHandle {
  url: string;
  name: string;
  platform: string;
}

interface IAuthor extends IUser {
  description?: string;
  display_image_url?: string;
  social_media_handles?: ISocialMediaHandle[];
  owner_id?: string;
}

const socialMediaHandleSchema = new Schema<ISocialMediaHandle>({
  url: { type: String, required: true },
  name: { type: String, required: true },
  platform: { type: String, required: true },
});

const authorSchema = new Schema<IAuthor>({
  ...userSchema.obj,
  description: { type: String },
  display_image_url: { type: String },
  social_media_handles: [socialMediaHandleSchema],
  owner_id: { type: String, default: "" },
});

const AuthorModel = mongoose.model<IAuthor>('Author', authorSchema);

// Interfaces for class methods

interface IAddPlatform {
    name: string;
    url: string;
    platform: string;
}

interface IUpdatePlatform {
  name?: string;
  url?: string;
}

class Author extends BaseModel<IAuthor> {
  private userInstance: User; // Instance of the User class

  constructor() {
    super(authorSchema);
    this.userInstance = new User(); // Initialize the User instance
  }

  // Delegating methods to the User instance

  async login(email: string, password: string): Promise<IResponse> {
    return this.userInstance.login(email, password);
  }

  async signup(email: string, password: string): Promise<IResponse> {
    return this.userInstance.signup(email, password);
  }

  async create(data: object): Promise<any> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data["hash_password"], saltRounds);
    data["hash_password"] = hashedPassword;
    return await super.create(data);
  }

  async update(_id: string, options: object): Promise<any> {
    if(options["hash_password"]) {
      const saltRounds = 10;
      options["hash_password"] = await bcrypt.hash(options["hash_password"], saltRounds);
    }

    return await super.update(_id, options);
  }

  /**
   * @NOT_COMPLETE
   */

  async addPlatform(id: string, options: IAddPlatform): Promise<IResponse>{

    return {
      message: "Platform added"
    }
  }

  /**
   * @NOT_COMPLETE
   */

  async removePlatform(id: string, index: number): Promise<IResponse>{

    return {
      message: "Platform removed"
    }
  }

  /**
   * @NOT_COMPLETE
   */

  async updatePlatform(id: string, index: number, options: IUpdatePlatform): Promise<IResponse>{

    return {
      message: "Platform updated"
    }
  }
}

export default new Author();
