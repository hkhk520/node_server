const { Op } = require("sequelize");

module.exports = (req, res) => {
    api.updateData('Code', {
        remove: 1
    },{
        codeId: {
            [Op.in]: ["IxCujS","QeTaVO"]
        }
    }).then(response => {
        res.send({data: response})
    }).catch(err => {
        console.log("err =>",err);
    })
}