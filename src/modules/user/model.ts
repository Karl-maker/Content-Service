import mongoose, { Schema, Document } from 'mongoose';
import BaseModel, { IResponse } from '../base/model';
import bcrypt from "bcrypt";

interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  hash_password: string;
  created_at: Date;
  updated_at: Date;
}

const userSchema = new Schema<IUser>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  hash_password: { type: String, required: true },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() }
},
{
    timestamps: { 
        updatedAt: 'updated_at', 
        createdAt: 'created_at' 
    } // Add this option to update the 'updated_at' field automatically
});

const UserModel = mongoose.model<IUser>('User', userSchema);

class User extends BaseModel<IUser> {
  constructor() {
    super(userSchema);
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

  async login(email: string, password: string): Promise<IResponse> {

    return {
        message: "Login successful",
        details: {
            access_token: ""
        }
    }
  }

  async signup(email: string, password: string): Promise<IResponse> {

    return {
        message: "Check Email for Confirmation"
    }
  }


}

export { IUser, userSchema, UserModel, User };