<?php
echo'
<html xmlns="http://www.w3.org/1999/xhtml">
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Illini Wildcards</title>
	<link href="css/design.css" media="screen" rel="stylesheet" title="no title"/>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
	<style type="text/css">
	#vote_button { align:center; background: url(\'vote.png\') no-repeat scroll 0 0 transparent; cursor: pointer; height: 40px; width: 95px; border: 10px solid white; }
	#vote_count { padding: 8px 0pt 0pt 30px; }';
	?>
	<?php 
	for ($j=1; $j<100; $j++)
	{
	echo'
	#vote_button_'.$j.' { margin-left:18%; background: url(\'voteicon.png\') no-repeat scroll 0 0 transparent; cursor: pointer; height: 40px; width: 150px; }
		#vote_count_'.$j.' { line-height:30px; text-align:center; margin-left:40%;  width:30px; height:30px; background:#ffffff; border-radius:10px;}';
	}
	?>
	<?php echo'
</style>
</head>
<body>
<div class = "container-fluid">
	<div class = "container-fluid">
<!-- nav bars -->
  <nav class="navbar navbar-fixed-top">
    <div class="container">
      <p class = "navbar-brand col-md-3" style="font-size:200%;">Illini WildCards</p>
      <ul class="nav nav-pills col-md-offset-7">
        <li role="presentation"><a href="index.html">Home</a></li>
        <li role="presentation"><a href="design.html">Draw</a></li>
        <li role="presentation"  class="active"><a href="voting.php">Vote</a></li>
        <li role="presentation"><a href="pastWinners.html">Past Winners</a></li>
     <!--   <li role="presentation"><a href="index.html#about_us">About Us</a></li>
        <li role="presentation"><a href="index.html#contact_us">Contact Us</a></li> -->
      </ul>
    </div>
  </nav>

<div id="imageborder">
</div>
<div id="backg">
<div align="center" style="margin-left:25%; width:600px; margin-top:75px; margin-bottom: 25px;background:#000000; color:white; line-height:75px; border-radius:25px;"><h1>Vote for your favorites this week!</h1></div></div>
<div align="center">
<div style="display: table;">
<div id="imgrow" style="display: table-row;">

';
?>
    <?php

   $files = glob("submissions/*.*");

  for ($i=1; $i<count($files); $i++)

{

$image = $files[$i];
$supported_file = array(
    'gif',
    'jpg',
    'jpeg',
    'png'
);

$ext = strtolower(pathinfo($image, PATHINFO_EXTENSION));
if (in_array($ext, $supported_file)) {
    echo '<div style="display: table-cell;"><div><div id="image123" style="border: 5pt solid #EF8C00; box-shadow: 0 0 0 3pt black; border-radius: 25px;
  background: #000080;
  padding:20px;
  margin:15px;
  width: 250px;
  height: 315px;"><img src="'.$image .'" height="200" width="200"/><div id="vote_button_'.$i.'" align="center"></div><div id="vote_count_'.$i.'" align="center">&nbsp;</div></div></div></div>';
if (($i % 4 == 0 && $i != 0)){
	echo '</div><div id="imgrow" style="display: table-row;">';
	}
} else {
    continue;
 }

}

?>

<?php
echo '</div></div></div></div></div><div>'
?>
<?php
echo '<script src= "https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"	type="text/javascript"></script> <script type="text/javascript">';?>
<?php
for($m=1;$m<count($files);$m++){
echo
'$(document).ready(function()
	{
		// Display number of votes for this item on page load.
		var item_id = '.$m.';	// This is the item_id for which the number of votes are to be displayed.
		var ajax_data1 = "query=votecount&item_id=" + item_id;
		jQuery.ajax({
			type: "GET",
			url: "vote.php",
			data: ajax_data1,
			dataType: "html",
			success: function(html){
				jQuery("#vote_count_'.$m.'").html(html);
		   }
		});
	});
	$("#vote_button_'.$m.'").click(function()
	{
		var item_id = '.$m.';	// This is the item_id for which the number of votes are to be displayed.
		var user_id = 1;	// This is the user_id who is voting.
		var ajax_data = "query=vote&item_id=" + item_id + "&user_id=" + user_id;
		$.ajax({
			type: "GET",
			url: "vote.php",
			data: ajax_data,
			dataType: "html",
			success: function(votecount){
				if(votecount == -1){
					// The user has already voted.
					
				}
				else
				{
					// Vote recorded, display the updated count.
					
					$("#vote_count_'.$m.'").html(votecount);
					
				}
			}
		});
	});
	';
}
?>
<?php echo'</script>'; ?>


