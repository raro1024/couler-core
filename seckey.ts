//This Module is responsible for the Seckey (Security Key)

import {
    db
} from "./db";
import {
    utils
} from "./utils";

export function getKey() {
    const newKey = utils.randomString();
    var expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);
    var dbData = {
        "secKey": newKey,
        "expiryDate": expiryDate
    }
    db.put("exnode-seckey", dbData);
    return newKey;

}
export async function validateKey(secKey) {
    const data = await db.get("exnode-seckey", {"secKey":secKey});
    if(data)
    {
        db.remove("exnode-seckey", {"secKey":secKey});
        return data["expiryDate"]>Date.now();
    }
    else{
        db.remove("exnode-seckey", {"secKey":secKey});
        return false;
    }
    
}
export function deleteKey(secKey) {
    db.remove("exnode-seckey", {"secKey":secKey});
}