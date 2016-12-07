<?php
$con = mysql_connect("localhost","illiniwi_votepage","z99293111");

if (!$con)
{
	die('Could not connect: ' . mysql_error());
}
mysql_select_db("illiniwi_votepage", $con);

// $con is the connection variable to the database
if($_GET['query'] == 'vote')
{
	$item_id = $_GET['item_id'];
	$user_id = $_GET['user_id'];
	$ip_addr = $_SERVER['REMOTE_ADDR'];
	// Check for entry in Database to see if the user has already voted
	$sql = "SELECT vote_id FROM votes WHERE ipaddress = ". ip2long($ip_addr) . " AND user_id = " . $user_id ." AND item_id = " . $item_id . " LIMIT 1";
	$votes = mysql_query($sql, $con);
	$already_voted = false;
	while ($row = mysql_fetch_array($votes))
	{
		$already_voted = true;
	}
	if($already_voted)
	{
		echo -1;
	}
	else
	{
		$sql = "INSERT INTO votes (item_id, user_id, ipaddress) VALUES (" . $item_id . ", ". $user_id . ", ". ip2long($ip_addr) . ")";
		mysql_query($sql, $con);
		// Get updated vote count.
		$total_votes = 0;
		$total_votes = mysql_query("SELECT COUNT(vote_id) as total FROM votes WHERE item_id = ". $item_id . " LIMIT 1", $con);
		while($row = mysql_fetch_array($total_votes))
		{
			echo $row['total'];
		}
	}
}
else if($_GET['query'] == 'votecount')
{
	$item_id = $_GET['item_id'];
	$total_votes = 0;
	$total_votes = mysql_query("SELECT COUNT(vote_id) as total FROM votes WHERE item_id = ". $item_id . " LIMIT 1", $con);
	while($row = mysql_fetch_array($total_votes))
	{
		echo $row['total'];
	}
}
mysql_close($con);
?>