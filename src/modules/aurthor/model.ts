import mongoose, { Schema, Document } from 'mongoose';
import BaseModel from '../base/model';

interface ISocialMediaHandle {
  url: string;
  name: string;
  platform: string;
}

interface IAuthor extends Document {
  first_name: string;
  last_name: string;
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
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  description: { type: String },
  display_image_url: { type: String },
  social_media_handles: [socialMediaHandleSchema],
  owner_id: { type: String, default: "" },
});

const AuthorModel = mongoose.model<IAuthor>('Author', authorSchema);

// Interfaces for class methods

interface IResponse {
  message: string;
  details?: object;
}

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
  constructor() {
    super(authorSchema);
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
