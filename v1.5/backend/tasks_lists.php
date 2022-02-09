<?php
$exclude = array(".", "..");
   $dir ="./";
   $folder = scandir($dir);
   $idx = 0;
   echo "{\"tasks\": [";
   foreach ($folder as $key => $value) 
   {
      if (! in_array($value, $exclude)) 
      {
         if (is_file($dir . '/' . $value))
         {
             if (fnmatch("tasks*.json", $value))
             {
                 $stat=stat($value);
                 if ($idx != 0) { echo ","; }
                 echo "{\"file\":\"" . $value . "\", \"date_creation\":\"" . date('Y-m-d H:i', $stat['ctime']) . "\", \"last_update\": \""  . date('Y-m-d H:i', $stat['mtime']) . "\", \"opened\": true}";
                 $idx++;
             }
         }
      }
   }
   echo "]}";
?>