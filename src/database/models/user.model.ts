import { Schema, model } from 'mongoose';
import { UserType } from '../../@types/user';

const UserSchema = new Schema<UserType>(
  {
    first_name: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    role: {
      type: Schema.Types.String,
      required: true,
    },
    telegram_id: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

UserSchema.methods.toJSON = function () {
  const userObj = this.toObject();

  userObj.id = userObj._id;
  delete userObj._id;

  delete userObj.createdAt;
  delete userObj.password;
  delete userObj.updatedAt;

  delete userObj.__v;
  return userObj;
};

export const User = model<UserType>('User', UserSchema);
