import { passswordBone } from "../bones/passwordBone";
import { stringBone } from "../bones/stringBone";
import { Skeleton } from "../skeleton";

export class UserSkel extends Skeleton {
    kindname = "user"
    name: stringBone;
    password: passswordBone;
    access: stringBone;

    constructor() {
        super();
       
        this.name = new stringBone({
            required: true,
            unique: true
        });
        this.password = new passswordBone();
        this.access = new stringBone({
            multiple: true
        });
    }

}