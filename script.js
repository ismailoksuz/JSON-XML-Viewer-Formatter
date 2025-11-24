const dataInput=document.getElementById('data-input');
const dataOutput=document.getElementById('data-output');
const typeSelect=document.getElementById('type-select');
const formatButton=document.getElementById('format-button');
const messageBox=document.getElementById('message-box');

function showMessage(message,type='error'){
    messageBox.textContent=message;
    messageBox.classList.remove('hidden','text-red-400','text-green-400');
    if(type==='error'){
        messageBox.classList.add('text-red-400');
    }else{
        messageBox.classList.add('text-green-400');
    }
    setTimeout(()=>{
        messageBox.classList.add('hidden');
    },3000);
}

formatButton.addEventListener('click',() => {
    const data=dataInput.value.trim();
    const dataType=typeSelect.value;
    let formattedData='';
    
    if(data===''){
        showMessage('Pleaseenterdataforformatting.', 'error');
        dataOutput.value='';
        return;
    }

    try{
        if(dataType==='json'){
            const parsedJson=JSON.parse(data);
            formattedData=JSON.stringify(parsedJson,null,4);
            showMessage('JSONvalidatedandformattedsuccessfully.', 'success');
        }else if(dataType==='xml'){
            const options={
                indent_size:4,
                space_in_empty_paren:true,
                //AddotherXMLformattingoptionshere
            };
            formattedData=window.html_beautify(data,options);
            showMessage('XMLformattedsuccessfully.', 'success');
        }

        dataOutput.value=formattedData;

    }catch(e){
        console.error('Formattingerror:',e);
        let errorMessage=`ValidationError:Invalid${dataType.toUpperCase()}syntax.`;
        if(dataType==='json'){
            errorMessage+=`Checkforcommas,braces,orinvalidJSONstructures.`;
        }else if(dataType==='xml'){
            errorMessage+=`Checkfortagmatchingornon-well-formedXML.`;
        }
        dataOutput.value=errorMessage;
        showMessage(errorMessage, 'error');
    }
});

document.addEventListener('DOMContentLoaded',() => {
    dataInput.value=`{"name":"ProductX","price":19.99,"features":["durable","portable","stylish"],"inStock":true}`;
});