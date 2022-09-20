export function sideNavDetect( SideNavItems, sideNavJson) {

    if( Object.keys(SideNavItems).length > 0) {

        SideNavItems.forEach((item) => {

            var temp = [];

            if(item.item_type == "F") {
                //dropdowns, main	
                SideNavItems.forEach((innerItem) => {

                    if(innerItem.parent_folder.toLowerCase() == item.item_name.toLowerCase())
                        temp.push(innerItem.item_name);

                });

                sideNavJson[item.item_name] = temp;

            }
            else if(item.parent_folder == "root") {
                //no dropdowns, main
                sideNavJson[item.item_name] = temp;
            }

        }); 

    }

}