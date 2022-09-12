var prodRows = document.getElementById("tbodyRows") ;
var prodRequest ; 
var prodData ;
var prodRowData = "" ;
var selectedProducts = "" ;
var sortOrder = "D" ;

prodRequest = new XMLHttpRequest( ) ;
prodRequest.open("GET", "product_data.json") ;
prodRequest.send( ) ;
prodRequest.onload = function( )
{
	prodData = JSON.parse(prodRequest.responseText) ;	
	renderTable(prodData) ;
}
	

function renderTable(data)
    {
        prodRowData = "" ;
        for (i = 0; i<data.length; i++)
            {                   
                prodRowData += "<tr><td>" + data[i].prodID + "</td><td>" + "<img src=" + data[i].prodImg + "/>" + "</td><td id='prodName"+i+"'>" + data[i].prodName + "</td> <td>"+ "</td><td id='prodDesc"+i+"'>" + data[i].prodDesc + "</td> <td>" + data[i].prodPrice + "</td><td>" + "<input type='number' min ='0' max = '9' id='ProdQty"+i+"' value='0'" + "</td></tr>";
			}        
	    prodRows.innerHTML = prodRowData ;
    }


function confirmQty( )
{
    for (i = 0; i<prodData.length; i++)
    {           
        var rowNum = i.toString( ) ;       
        var columnID = "ProdQty" + rowNum ;     
	    var iQty = document.getElementById(columnID).value;     
        if(iQty > 0)
        {        
            columnID = "prodName" + rowNum ;        
            selectedProducts += document.getElementById(columnID).innerText + ": Qty " + iQty + "\n";
        }
    }

    
  
    if (selectedProducts > "" && selectedProducts != null)
    {
        alert("You have selected the following products: \n" + selectedProducts) ;
    }
 }   



function sortByID()
{
    if (sortOrder == "A")   //sort in ascending order
    {
        prodData.sort(function(a,b)
        {
            return a.prodID - b.prodID ;
        } ) ;
        sortOrder = "D" ;
    }
    else    //sort in descending order
    {
        prodData.sort(function(a,b)
        {
            return b.prodID - a.prodID ;
        }) ;
        sortOrder = "A" ;
    }
    renderTable(prodData) ;
}

function sortByName()
{
    if (sortOrder == "A")   //sort in ascending order
    {
        prodData.sort(function(a,b)
        {
            if (a.prodName < b.prodName)
            {
                return -1 ;
            }
        } ) ;
        sortOrder = "D" ;
    }
    else    //sort in descending order
    {
        prodData.sort(function(a,b)
        {
            if (a.prodName > b.prodName) 
            {
                return -1  
            }
        } ) ;
        sortOrder = "A" ;
    }
    renderTable(prodData) ;
}

function sortByPrice()
{
   if (sortOrder == "A")   //sort in ascending order
    {
        prodData.sort(function(a,b)
        {
            return a.prodPrice - b.prodPrice ;
        } ) ;
        sortOrder = "D" ;
    }
    else    //sort in descending order
    {
        prodData.sort(function(a,b)
        {
            return b.prodPrice - a.prodPrice ;
        }) ;
        sortOrder = "A" ;
    }
    renderTable(prodData) ;
}

