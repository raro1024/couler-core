export function renderdateBone(boneName, bone) {
    if (bone.visible) {
        return `
    <label  for="${boneName}">${boneName}</label >
    <input type="date" name="${boneName}" id="${boneName}" placeholder="${bone.descr}" ${bone.required?"required":""}></input>
    `
    }
}