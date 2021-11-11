import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
    },

    first_name: {
      type: String,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
    },
    last_name: {
      type: String,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      lowercase: true,
      maxlength: 200,
      required: true,
      trim: true,
      unique: true,
    },
    phone_number: {
      type: Number,
      maxlength: 11,
    },
    password: {
      type: String,
      required: true,
    },
    wallet: {
      type: Schema.Types.ObjectId,
      ref: 'Wallet',
    },
    token: {
      type: String,
    },
  },
  { timestamps: true },
);

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type UserDocument = User & Document;

// @Schema()
// export class User {
//   @Prop({ required: true })
//   username: string;

//   @Prop({ required: true })
//   first_name: string;

//   @Prop({ required: true })
//   last_name: string;

//   @Prop({ required: true })
//   email: string;

//   @Prop({ required: true })
//   phone_number: number;

//   @Prop({ required: true })
//   password: string;

//   @Prop({ required: true })
//   createdAt: Date;

//   @Prop()
//   deletedAt?: Date;
// }

// export const UserSchema = SchemaFactory.createForClass(User);
