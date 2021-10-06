export function renderstringBone(boneName,bone)
{
    
    return`
    <label  for="${boneName}">${boneName}</label >
    <input type="text" name="${boneName}" id="${boneName}" placeholder="${bone.descr}" ${bone.required?"required":""}></input>
    `

}