<?php
//phpinfo();
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>aeptest</title>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="./public/assets/css/app.css">

        <script src="./public/assets/js/common.js"></script>
        <script src="./public/assets/js/modules/message-modal.js" defer></script>
        <script src="./public/assets/js/modules/customer.js" defer></script>
        <script src="./public/assets/js/app.js" defer></script>
    </head>
    <body>
    <div id="messageModal" class="modal">
        <div class="modal-content">
            <div style="display: flex; justify-content: space-between; border:1px solid silver; padding-right: 12px;">
                <div style="display: flex; align-items: center; padding: 0 0 0 4px" id="messageModalTitle"></div>
                <div id="messageModalClose" class="close">&times;</div>
            </div>
            <div style="border:1px solid silver; padding: 4px;">
                <div id="messageModalMessages"></div>
                <div style="display: flex; justify-content: center;">
                    <a class="clickable" id="messageModalConfirm">Okay</a>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div>
            <fieldset>
                <legend>Navigation</legend>
                <ul>
                    <li><a>Customers</a></li>
                    <li><a href="search.php">Search</a></li>
                    <li><a href="calculator.php">Calculator</a></li>
                </ul>
            </fieldset>
        </div>
        <div>
            <fieldset>
                <legend>Customers</legend>
                <form enctype="multipart/form-data" method="post" id="customer-form">
                    <table border="1" id="customersTable">

                    </table>
                </form>
            </fieldset>
        </div>
    </div>
    </body>
</html>
