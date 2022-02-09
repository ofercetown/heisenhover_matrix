<?php
# Debug loop
#foreach ($_POST as $key => $value)
#{
#        echo $key . "=" . $value . "\n";
#}


if (empty($_POST))
  {
     header('HTTP/1.0 403 Forbidden');
     echo "Error : upload file forbidden.";
  }
  else
  {
     if (!isset($_POST['tasks_json']))
     {
         header('HTTP/1.0 403 Forbidden');
         echo "Error : upload file forbidden/failed (0x10ddf385).";
         return;
     }
     if (!isset($_POST['filename']))
     {
         header('HTTP/1.0 403 Forbidden');
         echo "Error : upload file forbidden/failed (0xb36ef990)";
         return;
     }
     $filename = basename($_POST['filename']);
     $filename_len = strlen($filename);
     if ($filename_len < 5 || $filename_len > 48)
     {
         header('HTTP/1.0 403 Forbidden');
         echo "Error : upload file forbidden/failed (0x436ffed0)." . $filename_len . $_POST['filename'];
         return;
     }

     # TODO: ajouter un check sur la taille

     # At this point file is actually saved.
     {
         $myfile = fopen($filename, "w") or die("Unable to open file.");
         fwrite($myfile, $_POST["tasks_json"]);
         fclose($myfile);
     }
  }
?>