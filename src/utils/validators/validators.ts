export const required=(value:string)=>{
    console.log('fff')
    if(value) return undefined

    return 'Field is required'
}


export const maxLenghtCreator=(maxValue:number)=>(value:string)=>{
    if(value&&value.length>maxValue){return `Max lenght is ${maxValue} symbols`}
    return undefined
}
