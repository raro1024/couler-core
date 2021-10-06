export function rendernumericBone(boneName,bone)
{
    
    return`
    <label  for="${boneName}">${boneName}</label >
    <input type="number" name="${boneName}" id="${boneName}" placeholder="${bone.descr}" ${bone.required?"required":""}></input>
    `

}