import { Bone } from "../bone";


export function renderdateBone(boneName,bone:Bone)
{
    if(bone.required)
    {}
    return`
    <label  for="${boneName}">${boneName}</label >
    <input type="date" name="${boneName}" id="${boneName}" placeholder="${bone.descr}" ${bone.required?"required":""}></input>
    `
}