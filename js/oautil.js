/**
 * File Name: oautil.js
 *
 * Revision History:
 *       Olayimika Akinbola, 2022-02-09 : Created
 */


function doValidate_oaFrmAdd(){
    let form = $("#oaFrmAdd");
    form.validate({
        rules:{
            businessName:{
                required:true,
                rangelength:[2,20]
            },

            reviewerEmail:{
                required: true,
                emailcheck: true
            },

            reviewDate:{
                required: true,
            },

            quality:{
                range:[0,5]
            },

            service:{
                range:[0,5]
            },

            value:{
                range:[0,5]
            }

        },

        messages:{
            businessName:{
                required: "Business name is required",
                rangelength:  "Business Name Length must be between 2-20 characters long."
            },

            reviewerEmail:{
                required: "Email is required",
                emailcheck: "Please enter a valid email"
            },
            reviewDate:{
                required: " Review Date is required",
            },
            quality:{
                range: "Food Quality rating is from 0-5"

            },
            service:{
                range:"Service rating is from 0-5"
            },

            value:{
                range:"value rating is from 0-5"
            }

        }
    });
    return form.valid();
}

function doValidate_oaFrmModify(){
    let  form = $("#oaModifyForm");
    form.validate({
        rules:{
            modifyName:{
                required:true,
                rangelength:[2,20]
            },

            modifyEmail:{
                required: true,
                emailcheck : true
            },

            modifyDate:{
                required: true,
            },

            modifyQuality:{
                range:[0,5]
            },

            modifyService:{
                range:[0,5]
            },

            modifyValue:{
                range:[0,5]
            }

        },

        messages:{
            modifyName:{
                required: "Business name is required",
                rangelength:  "Business Name Length must be between 2-20 characters long."
            },

            modifyEmail:{
                required: "Email is required",
                emailcheck: "Please enter a valid email"
            },
            modifyDate:{
                required: " Review Date is required",
            },
            modifyQuality:{
                range: "Food Quality rating is from 0-5"

            },
           modifyService:{
                range:"Service rating is from 0-5"
            },

            modifyValue:{
                range:"value rating is from 0-5"
            }

        }
    });
    return form.valid();
}

jQuery.validator.addMethod("emailcheck",
    function(value, element){
        let regex= /^\S+@\S+\.\S+$/;

        return this.optional(element) || regex.test(value);
    },
    "Enter a valid email");