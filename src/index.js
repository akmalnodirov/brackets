module.exports = function check(str, bracketsConfig) {

    return checkStr(str, bracketsConfig);

}

function checkStr(str, bracketsConfig){

    let result = true;
    let counter = 0;

    while(str.length > 0 && bracketsConfig.length > 0 && result ){

        counter++;

        for(let x = 0; x < bracketsConfig.length && str; x++){

            if(str.length == 1){
                result = false;
                break;
            }

            let first_element = bracketsConfig[x][0];
            let second_element = bracketsConfig[x][1];

            let brackets = first_element + '' + second_element;

            let second_index = str.indexOf(second_element);
            let first_index = str.lastIndexOf(first_element, second_index-1);

            if(str.includes(brackets)){
                str = replaceAll(str, brackets, '');

            } else if((first_index != -1 && second_index == -1) || (first_index == -1 && second_index!= -1)){
                result = false;
                break;

            } else {
                let part_str = str.substring(first_index+1, second_index);

                if(part_str){
                    if(checkStr(part_str, bracketsConfig)){
                        str = replaceAll(str, part_str, '');
                    }else{

                        result = false;
                        break;
                    }
                }


            }

        }

    }


    return result;
}

function replaceAll (str, search, replacement) {
    let counter = 0;
    while(str.includes(search) ){
        str = str.replace(search, replacement);
        counter ++;
    }


    return str;
};
