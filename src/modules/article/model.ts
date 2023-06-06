import mongoose, { Schema, Document } from 'mongoose';
import BaseModel, { IResponse } from '../base/model';

interface IArticleElement { // Sections of an article
  element_type: string; // video, paragraph, image, 3d..
  markdown?: string;
  url?: string;
  caption?: string;
}

interface IStatus {
    status: string;
    created_at: Date;
    updated_at: Date;
}

interface IArticle extends Document {
  headline: string;
  subheadline: string;
  categories?: string[];
  feature_image_url?: string;
  elements: IArticleElement[];
  author_ids: string[];
  status: IStatus;
  created_at: Date;
  updated_at: Date;
}

const articleSchema = new Schema<IArticle>({
    headline: { type: String, required: true },
    subheadline: { type: String, required: true },
    categories: [{ type: String, required: false }],
    feature_image_url: { type: String },
    elements: [],
    author_ids: [{ type: String, required: false }],
    status: {
        status: { type: String, required: true, default: "pending" },
        created_at: { type: Date, required: true, default: new Date() },
        updated_at: { type: Date, required: true, default: new Date() },
    },
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() }
  }, 
  {
    timestamps: { 
        updatedAt: 'updated_at', 
        createdAt: 'created_at' 
    } // Add this option to update the 'updated_at' field automatically
  }
);


const ArticleModel = mongoose.model<IArticle>('Article', articleSchema);

// Interfaces for class methods

class Article extends BaseModel<IArticle> {
  constructor() {
    super(articleSchema);
  }

  async uploadImage() {
    
  }

  async uploadFeatureImage() {

  }

  async uploadImageElement() {
    
  }

}

export default new Article();
