const {Diet} = require('../db')

const allTypes = [
    'Gluten Free',
    'Ketogenic',
    'Vegetarian',
    'Lacto Ovo Vegetarian',
    'Vegan',
    'Pescatarian',
    'Paleo',
    'Paleolithic',
    'Primal',
    'Whole 30',
    'Dairy Free',
    'Foodmap Friendly'
]




module.exports = 
{
    getTypes: async (req, res) => {
        const types = await Diet.findAll({ attributes: ['id','name']});

        if (types.length < 1) {
            for (let i = 0; i < allTypes.length; i++) {
                const type = await Diet.create({ name: allTypes[i] });
                //console.log(type.toJSON().name)
            }
            const types2 = await Diet.findAll({ attributes: ['id','name']});
            res.json(types2)
        }else{
            res.json(types)
        }
        
    }
    
}