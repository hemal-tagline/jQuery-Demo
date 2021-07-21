// Table Load Function
function table_load(){
    $("tbody").empty()
    for(i=0;i<Person.length;i++){
        Test = "<tr>" + 
                    "<td>" +  Person[i].name +  "</td>" + 
                    "<td>" +  Person[i].email +  "</td>" + 
                    "<td>" +  Person[i].gender +  "</td>" + 
                    "<td>" +  Person[i].hobby +  "</td>" + 
                    "<td>" +  Person[i].country +  "</td>" + 
                    "<td>" +  Person[i].state +  "</td>" + 
                    "<td>" +  Person[i].city +  "</td>" + 
                    "<td><button class='btn btn-warning Edit' value="+ i +" id="+ i +">Edit</button></td>" + 
                    "<td><button class='btn btn-danger Delete' value="+ i +" id='Delete'>Delete</button></td>" + 
                "</tr>";
                $("table tbody").append(Test);           
    }
}

var Person = new Array();
var CountryList  =  {
        'India' : { 'Gujarat':["Surat","Rajkot"] , 'Kerala':["Kochi","Thiruvananthapuram"] , 'Bihar':["Patna","Gaya"] , 'Punjab':["Amritsar","Patiala"] } ,
        'UnitedStates' : { 'Alabama':["Birmingham","Huntsville"] ,'Alaska':["Anchorage","Juneau"] ,'Arizona':["Avondale","Benson"] ,'Arkansas':["Little Rock","Fayetteville"] } ,
        'China' : { 'Anhui':["Hefai","Bózhōu"], 'Fujian':["Chángtài","Chángtīng"], 'Guangdong':["Bóluó","Dàbŭ"], 'Guizhou':["Ānlóng","Bìjié"] } 
}

$(document).ready(function(){
    
    // Country Option
    for( var Country in CountryList ) {
        $($("select[name=country]")).append("<option id="+ Country +" value="+Country+">"+ Country +"</option>");
    }
    
    // State Option
    $($("select[name=country]")).change(function(){
        $($("select[name=state]")).empty()
        $($("select[name=state]")).append("<option value='' >Select State</option>")
        for (var State in CountryList[$(this).val()]){
            $($("select[name=state]")).append("<option id="+ State +" value="+ State +">"+ State +"</option>");
        }
    })

    // City Option
    $($("select[name=state]")).change(function(){
        $($("select[name=city]")).empty()
        City = CountryList[$("select[name=country]").val()][$(this).val()];
        $($("select[name=city]")).append("<option value=''>Select City</option>")
        for (var i=0; i<City.length; i++){
            $($("select[name=city]")).append("<option id="+ City[i] +" value="+City[i]+">"+ City[i] +"</option>");
        }
    })
    
    // Save & Update Form
    $($("button[name=submitVal]")).click(function(event){
        event.preventDefault();
        var Data = $("form").serializeArray()
        var StoreObj = {  };
        $.each(Data, function() {
            StoreObj[this.name] = this.value;
        });
        if(DataValidation() == 0){
            if($('input[name=id]').val() != ""){
                Person[$('input[name=id]').val()] = StoreObj;
                $('input[name=id]').val('')
            }else{
                Person.push(StoreObj);
            }
            table_load()
            CleanForm()
        }else{
            return false
        }
    })

    var PersonInfo = {
        id : "",
        name : "Hemal",
        email : "hemal.tagline@gmail.com",
        gender : "Male",
        hobby : ['Traveling'],
        country : "India",
        state : "Gujarat",
        city : "Surat"
    }
    Person.push(PersonInfo)
    PersonInfo = {
        id : "",
        name : "Piyush",
        email : "Piyush.tagline@gmail.com",
        gender : "Male",
        hobby : ['Reading','Traveling'],
        country : "India",
        state : "Gujarat",
        city : "Surat"
    }
    Person.push(PersonInfo)
    table_load()
    
})
// Edit Data
$(document).ready(function(){
    $("table #tbody").on("click",".Edit",function(){
        $("button:first").removeClass('btn-primary')
        $("button:first").addClass('btn-warning').text("Update")
        // $(':input','#form').removeAttr('checked')
        $($("input[name=id]")).val($(this).val())
        $($("input[name=name]")).val(Person[$(this).val()]['name'])        
        $($("input[name=email]")).val(Person[$(this).val()]['email'])
        $('input[name=gender]').val([$(this).parent().prevAll()[4].innerText])
        CheckBoxVal = $(this).parent().prevAll()[3].innerText
        for(i=0;i<CheckBoxVal.split(',').length;i++)
        {
            $("form #"+ CheckBoxVal.split(',')[i].toLowerCase() +"").attr('checked', true)
        }
        $($("select[name=country]")).val($(this).parent().prevAll()[2].innerText);

        if($($("select[name=country]")).val() != ""){
            $($("select[name=state]")).empty()
            for(var State in CountryList[$("select[name=country]").val()]){
                if($(this).parent().prevAll()[1].innerText == State){
                    $($("select[name=state]")).append("<option id="+ State +" value="+ State +" selected >"+ State +"</option>");
                }else{
                    $($("select[name=state]")).append("<option id="+ State +" value="+ State +" >"+ State +"</option>");
                }
            }
        }
        if($($("select[name=state]")).val() != ""){
            $($("select[name=city]")).empty()
            var City = CountryList[$("select[name=country]").val()][$(this).parent().prevAll()[1].innerText];            
            for (var i=0; i<City.length; i++){
                if($(this).parent().prevAll()[1].innerText == City[i]){
                   $($("select[name=city]")).append("<option id="+ City[i] +" value="+ City[i] +" selected >"+ City +"</option>");
                }else{
                    $($("select[name=city]")).append("<option id="+ City[i] +" value="+City[i]+">"+ City[i] +"</option>");
                }
            }
        }
        $('button[name="closeVal"]').css("display",'flex')
    })
})

// Delete Data
$(document).ready(function() {
    $("table #tbody").on("click",".Delete",function(){
        Person.splice($(this).val(),1)
        $(this).parent().parent().hide();
    })
});

// Close Button
$('button[name="closeVal"]').on("click",function(){
    CleanForm()
})

// Reset Function
function CleanForm(){
    $(':input','#form')
    .not(':button, :submit, :reset, :hidden')
    .val('')
    .removeAttr('checked')
    .removeAttr('selected');
    $('input[name="gender"]').prop('checked', false);
    $("button:first").removeClass('btn-warning')
    $("button:first").addClass('btn-primary').text("Submit")
    $('button[name="closeVal"]').css("display",'none')
}

// Form Validation
function DataValidation(){
    var Error = 0;
    $("span").empty()
    if($($("input[name=name]")).val() == ""){
        $($("input[name=name]")).after("<span id='ForName'>Please Enter A Name</span>")
        Error++;
    }

    if($($("input[name=email]")).val() == ""){
        $($("input[name=email]")).after("<span id='ForName'>Please Enter A Email</span>")
        Error++;
    }

    if($($("select[name=country]")).val() == ""){
        $($("select[name=country]")).after("<span id='ForName'>Please Select Country</span>")
        Error++;
    }
    if(($($("select[name=state]")).val() == "")){
        $($("select[name=state]")).after("<span id='ForName'>Please Select State</span>")
        Error++;
    }

    if($($("select[name=city]")).val() == ""){
        $($("select[name=city]")).after("<span id='ForName'>Please Select City</span>")
        Error++;
    }
    
    if($('input[type=checkbox]:checked').length == 0){
        $("#ForHobby").after("<span id='ForName'>Please Select Hobby</span>")
        Error++;
    }
    
    if(($('input[type=radio]:checked').length) == 0){
        $("#ForGender").after("<span id='ForName'>Please Select Gender</span>")
        Error++;
    }
    return Error
}
$($("input[name=state]")).click(function(){
    if($("input[name=country]").val() == ""){
        $($("input[name=state]")).after("<span id='ForName'>First of all You need to select Country</span>")
    }
})
$($("input[name=city]")).click(function(){
    if($($("input[name=state]")).val() == ""){
        $($("input[name=city]")).after("<span id='ForName'>First of all You need to select State</span>")
    }
})

// Search Box
$(document).ready(function(){
  $('input[name=search]').on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tbody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

// Asc & Desc
$(document).ready(function(){
    $("table").on("click", "th:first", function () {
        var index = $(this).index();
        rows = [],
        ASCDESC = $(this).hasClass('asc') ? 'desc' : 'asc';
        $('.table th').removeClass('asc desc');
        $("th:first").text("Name (Asc order)")
        $(this).addClass(ASCDESC);
            $('.table tbody tr') .each(function (index, row) {
                rows.push($(row).detach());
            });
            rows.sort(function (a, b) {
                var aValue = $(a).find('td:eq(' + index +')').text();
                var bValue = $(b).find('td:eq(' + index +')').text();
                return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
            });
        // Reverse
        if ($(this).hasClass('desc')) {
            $("th:first").text("Name (Desc order)")
            rows.reverse();
        }
        // Table in Append a Row
        $.each(rows, function (index, row) {
            $('table tbody').append(row);
        });
    });
});