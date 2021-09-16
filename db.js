async toDB(data, database) {

        const result = await _collection.insertOne(data);
        console.log(result)
        return result;
}

async fromDB(_collection)
{
    return await _collection.find({}).toArray();

}