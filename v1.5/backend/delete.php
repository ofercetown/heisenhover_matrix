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
     if (!isset($_POST['filename']))
     {
         header('HTTP/1.0 403 Forbidden');
         echo "Error : Delete file forbidden/failed (0xb36ef990)";
         return;
     }
     $filename = basename($_POST['filename']);
     $filename_len = strlen($filename);
     if ($filename_len < 5 || $filename_len > 48)
     {
         header('HTTP/1.0 403 Forbidden');
         echo "Error : Delete file forbidden/failed (0x436ffed0)." . $filename_len . $_POST['filename'];
         return;
     }

     $trash_folder="./trash";
     if (! is_dir($trash_folder))
     {
          if (!mkdir($trash_folder, 0777, true))
          {
               header('HTTP/1.0 403 Forbidden');
               echo "Error : Delete file forbidden/failed (0x3a8e906ec).";
          }
     }

     # TODO: ajouter un check sur la taille

     # At this point file can be moved.
     $result = rename($filename, $trash_folder . '/' .$filename) or die("Unable to move file");
     if (! result)
     {
         header('HTTP/1.0 403 Forbidden');
         echo "Error : Delete file forbidden/failed (0xda218f00).";
         return;
     }
  }
?>