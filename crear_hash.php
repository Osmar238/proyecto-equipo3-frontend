<?php
// crear_hash.php

// ---- Escribe la contraseña que quieras usar aquí ----
$password_plana = 'admin456';
// ---------------------------------------------------

// PHP la encripta usando el método más seguro
$hash_nuevo = password_hash($password_plana, PASSWORD_DEFAULT);

// Muestra el resultado en pantalla para que lo copies
echo "¡Tu nuevo hash para la contraseña '<b>" . $password_plana . "</b>' está listo!<br><br>";
echo "Copia esta cadena completa (incluyendo los $):<br><br>";
echo "<input type='text' value='" . $hash_nuevo . "' style='width: 500px; font-size: 16px; padding: 5px;'>";
?>