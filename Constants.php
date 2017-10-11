<?php

/**
 - Our Constants.php class.
 - Holds our database constants like server name, database name, username, password and table name
 */
class Constants
{
    //DATABASE DETAILS
    static $DB_SERVER="localhost";
    static $DB_NAME="codartdb";
    static $USERNAME="sisi";
    static $PASSWORD="pass";
    const TB_NAME="post";

    //STATEMENTS
    static $SQL_SELECT_ALL="SELECT * FROM post";

}