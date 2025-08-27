import { Model } from 'mongoose';
import { VillaDocument } from '../schemas/villa.schema';
import { UserDocument } from '../schemas/user.schema';
export declare class DatabaseSeeder {
    private villaModel;
    private userModel;
    constructor(villaModel: Model<VillaDocument>, userModel: Model<UserDocument>);
    seed(): Promise<void>;
    private seedVilla;
    private seedAdminUser;
}
