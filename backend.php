<?php
    $vTeamID = $_POST['vTeamID'];
    $vMemberName = $_POST['vMemberName'];
    $vStartDate = $_POST['vStartDate'];
    $vEndDate = $_POST['vEndDate'];

    //Database connection
    $conn = new mysqli('localhost','root','','labbooking');
    if($conn->connect_error)
    {
        die('Connection Failed : '.$conn->connect_error);
    }
    else
    {
        $stmt = $conn->prepare("insert into Registrations(Team_ID, Member_Name, Start_Date, End_Date) values(?,?,?,?)");
        $stmt->bind_param("ssss",$vTeamID, $vMemberName, $vStartDate, $vEndDate);
        $stmt->execute();
        echo "Booking Added Successfully.....";
        $stmt->close();
        $conn->close();
    }
?>