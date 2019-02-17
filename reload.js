function check_reload() {		
				$.get("../reload.txt", function(data, status){
					if(data == "OK") { window.location.reload(); }
  				});	
			}

setInterval(check_reload, 1000);