<?php

/**
 - Our DBAdapter class.
 - We perform our CRUD database operation here.
 - We insert data to mysql, retrieve the data and show return json encoded data.
 - We use object oriented mysqli.
 */
require_once("Constants.php");

class DBAdapter
{
    /*******************************************************************************************************************************************/
    /*
       1.CONNECT TO DATABASE.
       2. RETURN CONNECTION OBJECT
    */
    public function connect()
    {
       // $con=mysqli_connect(Constants::$DB_SERVER,Constants::$USERNAME,Constants::$PASSWORD,Constants::$DB_NAME);
        $con=new mysqli(Constants::$DB_SERVER,Constants::$USERNAME,Constants::$PASSWORD,Constants::$DB_NAME);
        if($con->connect_error)
        {
             echo "Unable To Connect";
            return null;
        }else
        {
            return $con;
        }
    }
    /*******************************************************************************************************************************************/
    /*
       1.INSERT SPACECRAFT INTO DATABASE
     */
    public function insert($p)
    {
        // INSERT
        $con=$this->connect();
        if($con != null)
        {
            $sql="INSERT INTO post(title,body) VALUES('$p[0]','$p[1]')";
            try
            {
                $result=$con->query($sql);
                if($result)
                {
                    print(json_encode(array("Success")));
                }else
                {
                    print(json_encode(array("UNSUCCESSFUL")));
                }
                $con->close();
            }catch (Exception $e)
            {
                print(json_encode(array("ERROR","PHP EXCEPTION : CAN'T SAVE TO MYSQL. ".$e->getMessage())));
                $con->close();
            }
        }else{
            print(json_encode(array("ERROR","PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
    }
    /*******************************************************************************************************************************************/
    /*
       1.SELECT FROM DATABASE.
    */
    public function select()
    {
        $con=$this->connect();
        if($con != null)
        {
            $result=$con->query(Constants::$SQL_SELECT_ALL);
            if($result->num_rows>0)
            {
                $post_titles=array();
                while($row=$result->fetch_array())
                {
                    $spacecrafts[]=$row;
                    array_push($post_titles, $row['title']);
                }
                print(json_encode(array_reverse($post_titles)));
            }else
            {
                print(json_encode(array("PHP EXCEPTION : CAN'T RETRIEVE FROM MYSQL. ")));
            }
            $con->close();

        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
    }
}
