window.onscroll = () => {
  document.querySelector(".mountains").style.marginBottom = -scrollY + "px";

  document.querySelector(".stars").style.marginTop = scrollY + "px";

  document.querySelector(".stars").style.marginRight = scrollY * 1.3 + "px";

  document.querySelector(".stars").style.opacity = (500 - scrollY) / 500;

  document.querySelector(".light").style.opacity = scrollY / 150;

  document.querySelector(".Home h1").style.marginTop = scrollY + "px";

  document.querySelector(".Home h1").style.opacity = (200 - scrollY) / 200;

};

php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];

    // Validate and sanitize inputs (you may need more robust validation)
    $name = htmlspecialchars($name);
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);

    // Email content
    $to = "biglongnow1@gmail.com"; // Replace with your email address
    $subject = "New Signup from Your Website";
    $message = "Name: $name\n";
    $message .= "Email: $email\n";
    $headers = "From: no-reply@yourdomain.com"; // Replace with your domain email

    // Send email
    $mailSent = mail($to, $subject, $message, $headers);

    if ($mailSent) {
        echo "Thank you for signing up! We will contact you shortly.";
    } else {
        echo "Failed to send email. Please try again later.";
    }
}
