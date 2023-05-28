import mongoose, { Model, Document, Query } from 'mongoose';

class BaseModel<T extends Document> {
  public model: Model<T>;

  constructor(schema: mongoose.Schema) {
    this.model = mongoose.model<T>(this.constructor.name, schema);
  }

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async find(query: object): Promise<T[]> {
    return await this.model.find(query).exec();
  }

  async delete(_id: string): Promise<any> {
    return await this.model.deleteOne({ _id }).exec();
  }

  async update(_id: string, options: object): Promise<any> {
    return await this.model.updateOne({ _id }).exec();
  }

  // Add other common methods as needed

  // You can also add instance methods and static methods specific to each model
}

export default BaseModel;
