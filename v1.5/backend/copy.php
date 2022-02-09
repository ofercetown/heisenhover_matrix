<?php
# Debug loop
#foreach ($_POST as $key => $value)
#{
#        echo $key . "=" . $value . "\n";
#}

# TODO const values 5 and 48 must be moved in a class

if (empty($_POST))
  {
     header('HTTP/1.0 403 Forbidden');
     echo "Error : upload file forbidden.";
  }
  else
  {
     if (!isset($_POST['filename_src']) || !isset($_POST['filename_dst']))
     {
         header('HTTP/1.0 403 Forbidden');
         echo "Error : Copy file forbidden/failed (0xb36ef990)";
         return;
     }
     $filename_src = basename($_POST['filename_src']);
     $filename_src_len = strlen($filename_src);
     if ($filename_src_len < 5 || $filename_src_len > 48)
     {
         header('HTTP/1.0 403 Forbidden');
         echo "Error : Copy file forbidden/failed (0x436ffed0)." . $filename_src . " " . $filename_src_len;
         return;
     }

     $filename_dst = basename($_POST['filename_dst']);
     $filename_dst_len = strlen($filename_dst);
     if ($filename_dst_len < 5 || $filename_dst_len > 48)
     {
         header('HTTP/1.0 403 Forbidden');
         echo "Error : Copy file forbidden/failed (0x578ffed2).";
         return;
     }

     # At this point file can be copied.
     $result = copy("$filename_src", "$filename_dst");
     if (! $result)
     {
         header('HTTP/1.0 403 Forbidden');
         echo "Error : Copy file forbidden/failed (0x003da978).";
         return;
     }
  }
?>