<?php

namespace Database\Seeders;

use App\Models\EmailTemplate;
use App\Models\EmailTemplateLang;
use App\Models\UserEmailTemplate;
use Illuminate\Database\Seeder;

class EmailTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $userId = 1;
        $languages = json_decode(file_get_contents(resource_path('lang/language.json')), true);
        $langCodes = collect($languages)->pluck('code')->toArray();

        $templates = [
            [
                'name' => 'Appointment Created',
                'from' => config('app.name'),
                'translations' => [
                    'en' => [
                        'subject' => 'Appointment Confirmation',
                        'content' => '<p>Dear {appointment_name},</p><p>Your appointment has been successfully created.</p><p><strong>Details:</strong></p><ul><li>Email: {appointment_email}</li><li>Phone: {appointment_phone}</li><li>Date: {appointment_date}</li><li>Time: {appointment_time}</li></ul><p>Thank you for choosing {app_name}.</p>'
                    ],
                    'es' => [
                        'subject' => 'Confirmación de Cita',
                        'content' => '<p>Estimado/a {appointment_name},</p><p>Su cita ha sido creada exitosamente.</p><p><strong>Detalles:</strong></p><ul><li>Email: {appointment_email}</li><li>Teléfono: {appointment_phone}</li><li>Fecha: {appointment_date}</li><li>Hora: {appointment_time}</li></ul><p>Gracias por elegir {app_name}.</p>'
                    ],
                    'fr' => [
                        'subject' => 'Confirmation de rendez-vous',
                        'content' => '<p>Cher/Chère {appointment_name},</p><p>Votre rendez-vous a été créé avec succès.</p><p><strong>Détails :</strong></p><ul><li>Email : {appointment_email}</li><li>Téléphone : {appointment_phone}</li><li>Date : {appointment_date}</li><li>Heure : {appointment_time}</li></ul><p>Merci d\'avoir choisi {app_name}.</p>'
                    ],
                    'ar' => [
                        'subject' => 'تأكيد الموعد',
                        'content' => '<p>عزيزي/عزيزتي {appointment_name},</p><p>تم إنشاء موعدك بنجاح.</p><p><strong>التفاصيل:</strong></p><ul><li>البريد الإلكتروني: {appointment_email}</li><li>الهاتف: {appointment_phone}</li><li>التاريخ: {appointment_date}</li><li>الوقت: {appointment_time}</li></ul><p>شكرًا لاختيارك {app_name}.</p>'
                    ],
                    'it' => [
                        'subject' => 'Conferma dell\'appuntamento',
                        'content' => '<p>Caro/a {appointment_name},</p><p>Il tuo appuntamento è stato creato con successo.</p><p><strong>Dettagli:</strong></p><ul><li>Email: {appointment_email}</li><li>Telefono: {appointment_phone}</li><li>Data: {appointment_date}</li><li>Ora: {appointment_time}</li></ul><p>Grazie per aver scelto {app_name}.</p>'
                    ],
                    'pt-BR' => [
                        'subject' => 'Confirmação de Agendamento',
                        'content' => '<p>Prezado(a) {appointment_name},</p><p>Seu agendamento foi criado com sucesso.</p><p><strong>Detalhes:</strong></p><ul><li>Email: {appointment_email}</li><li>Telefone: {appointment_phone}</li><li>Data: {appointment_date}</li><li>Hora: {appointment_time}</li></ul><p>Obrigado por escolher {app_name}.</p>'
                    ],
                    'da' => [
                        'subject' => 'Aftalebekræftelse',
                        'content' => '<p>Kære {appointment_name},</p><p>Din aftale er blevet oprettet.</p><p><strong>Detaljer:</strong></p><ul><li>Email: {appointment_email}</li><li>Telefon: {appointment_phone}</li><li>Dato: {appointment_date}</li><li>Klokkeslæt: {appointment_time}</li></ul><p>Tak fordi du valgte {app_name}.</p>'
                    ],
                    'de' => [
                        'subject' => 'Terminbestätigung',
                        'content' => '<p>Sehr geehrte/r {appointment_name},</p><p>Ihr Termin wurde erfolgreich erstellt.</p><p><strong>Details:</strong></p><ul><li>Email: {appointment_email}</li><li>Telefon: {appointment_phone}</li><li>Datum: {appointment_date}</li><li>Uhrzeit: {appointment_time}</li></ul><p>Vielen Dank, dass Sie sich für {app_name} entschieden haben.</p>'
                    ],
                    'he' => [
                        'subject' => 'אישור תור',
                        'content' => '<p>{appointment_name} היקר/ה,</p><p>התור שלך נוצר בהצלחה.</p><p><strong>פרטים:</strong></p><ul><li>אימייל: {appointment_email}</li><li>טלפון: {appointment_phone}</li><li>תאריך: {appointment_date}</li><li>שעה: {appointment_time}</li></ul><p>תודה שבחרת ב־{app_name}.</p>'
                    ],
                    'ja' => [
                        'subject' => '予約確認',
                        'content' => '<p>{appointment_name} 様</p><p>ご予約が正常に作成されました。</p><p><strong>詳細:</strong></p><ul><li>メールアドレス: {appointment_email}</li><li>電話番号: {appointment_phone}</li><li>日付: {appointment_date}</li><li>時間: {appointment_time}</li></ul><p>{app_name} をご利用いただきありがとうございます。</p>'
                    ],
                    'nl' => [
                        'subject' => 'Afspraakbevestiging',
                        'content' => '<p>Beste {appointment_name},</p><p>Je afspraak is succesvol aangemaakt.</p><p><strong>Details:</strong></p><ul><li>Email: {appointment_email}</li><li>Telefoon: {appointment_phone}</li><li>Datum: {appointment_date}</li><li>Tijd: {appointment_time}</li></ul><p>Bedankt dat je voor {app_name} hebt gekozen.</p>'
                    ],
                    'pl' => [
                        'subject' => 'Potwierdzenie wizyty',
                        'content' => '<p>Szanowny/a {appointment_name},</p><p>Twoja wizyta została pomyślnie utworzona.</p><p><strong>Szczegóły:</strong></p><ul><li>Email: {appointment_email}</li><li>Telefon: {appointment_phone}</li><li>Data: {appointment_date}</li><li>Godzina: {appointment_time}</li></ul><p>Dziękujemy za wybór {app_name}.</p>'
                    ],
                    'pt' => [
                        'subject' => 'Confirmação de Agendamento',
                        'content' => '<p>Caro(a) {appointment_name},</p><p>O seu agendamento foi criado com sucesso.</p><p><strong>Detalhes:</strong></p><ul><li>Email: {appointment_email}</li><li>Telefone: {appointment_phone}</li><li>Data: {appointment_date}</li><li>Hora: {appointment_time}</li></ul><p>Obrigado por escolher o {app_name}.</p>'
                    ],
                    'ru' => [
                        'subject' => 'Подтверждение приёма',
                        'content' => '<p>Уважаемый(ая) {appointment_name},</p><p>Ваша запись успешно создана.</p><p><strong>Детали:</strong></p><ul><li>Электронная почта: {appointment_email}</li><li>Телефон: {appointment_phone}</li><li>Дата: {appointment_date}</li><li>Время: {appointment_time}</li></ul><p>Спасибо, что выбрали {app_name}.</p>'
                    ],
                    'tr' => [
                        'subject' => 'Randevu Onayı',
                        'content' => '<p>Sayın {appointment_name},</p><p>Randevunuz başarıyla oluşturuldu.</p><p><strong>Detaylar:</strong></p><ul><li>E-posta: {appointment_email}</li><li>Telefon: {appointment_phone}</li><li>Tarih: {appointment_date}</li><li>Saat: {appointment_time}</li></ul><p>{app_name}’i tercih ettiğiniz için teşekkür ederiz.</p>'
                    ],
                    'zh' => [
                        'subject' => '预约确认',
                        'content' => '<p>亲爱的 {appointment_name}，</p><p>您的预约已成功创建。</p><p><strong>详情：</strong></p><ul><li>电子邮件: {appointment_email}</li><li>电话: {appointment_phone}</li><li>日期: {appointment_date}</li><li>时间: {appointment_time}</li></ul><p>感谢您选择 {app_name}。</p>'
                    ],

                ]
            ],
            [
                'name' => 'User Created',
                'from' => 'Support Team',
                'translations' => [
                    'en' => [
                        'subject' => 'Welcome to our platform - {user_name}',
                        'content' => '<p>Hello {user_name},</p><p>Your account has been successfully created.</p><p><strong>Login Details:</strong></p><ul><li>Website: {app_url}</li><li>Email: {user_email}</li><li>Password: {user_password}</li><li>Account Type: {user_type}</li></ul><p>Please keep this information secure.</p><p>Best regards,<br>Support Team</p>'
                    ],
                    'es' => [
                        'subject' => 'Bienvenido a nuestra plataforma - {user_name}',
                        'content' => '<p>Hola {user_name},</p><p>Su cuenta ha sido creada exitosamente.</p><p><strong>Detalles de acceso:</strong></p><ul><li>Sitio web: {app_url}</li><li>Email: {user_email}</li><li>Contraseña: {user_password}</li><li>Tipo de cuenta: {user_type}</li></ul><p>Por favor mantenga esta información segura.</p><p>Saludos cordiales,<br>Equipo de Soporte</p>'
                    ],
                    'fr' => [
                        'subject' => 'Bienvenue sur notre plateforme - {user_name}',
                        'content' => '<p>Bonjour {user_name},</p><p>Votre compte a été créé avec succès.</p><p><strong>Détails de connexion :</strong></p><ul><li>Site web : {app_url}</li><li>Email : {user_email}</li><li>Mot de passe : {user_password}</li><li>Type de compte : {user_type}</li></ul><p>Veuillez garder ces informations en sécurité.</p><p>Cordialement,<br>Équipe de support</p>'
                    ],
                    'ar' => [
                        'subject' => 'مرحبًا بك في منصتنا - {user_name}',
                        'content' => '<p>مرحبًا {user_name}،</p><p>تم إنشاء حسابك بنجاح.</p><p><strong>تفاصيل تسجيل الدخول:</strong></p><ul><li>الموقع: {app_url}</li><li>البريد الإلكتروني: {user_email}</li><li>كلمة المرور: {user_password}</li><li>نوع الحساب: {user_type}</li></ul><p>يرجى الحفاظ على أمان هذه المعلومات.</p><p>مع أطيب التحيات،<br>فريق الدعم</p>'
                    ],
                    'da' => [
                        'subject' => 'Velkommen til vores platform - {user_name}',
                        'content' => '<p>Hej {user_name},</p><p>Din konto er blevet oprettet med succes.</p><p><strong>Loginoplysninger:</strong></p><ul><li>Websted: {app_url}</li><li>Email: {user_email}</li><li>Adgangskode: {user_password}</li><li>Konto Type: {user_type}</li></ul><p>Opbevar venligst disse oplysninger sikkert.</p><p>Med venlig hilsen,<br>Supportteamet</p>'
                    ],
                    'de' => [
                        'subject' => 'Willkommen auf unserer Plattform - {user_name}',
                        'content' => '<p>Hallo {user_name},</p><p>Ihr Konto wurde erfolgreich erstellt.</p><p><strong>Anmeldedaten:</strong></p><ul><li>Website: {app_url}</li><li>E-Mail: {user_email}</li><li>Passwort: {user_password}</li><li>Kontotyp: {user_type}</li></ul><p>Bitte bewahren Sie diese Informationen sicher auf.</p><p>Mit freundlichen Grüßen,<br>Support-Team</p>'
                    ],
                    'he' => [
                        'subject' => 'ברוך הבא לפלטפורמה שלנו - {user_name}',
                        'content' => '<p>שלום {user_name},</p><p>החשבון שלך נוצר בהצלחה.</p><p><strong>פרטי התחברות:</strong></p><ul><li>אתר: {app_url}</li><li>אימייל: {user_email}</li><li>סיסמה: {user_password}</li><li>סוג חשבון: {user_type}</li></ul><p>אנא שמור על המידע הזה באופן מאובטח.</p><p>בברכה,<br>צוות התמיכה</p>'
                    ],
                    'it' => [
                        'subject' => 'Benvenuto sulla nostra piattaforma - {user_name}',
                        'content' => '<p>Ciao {user_name},</p><p>Il tuo account è stato creato con successo.</p><p><strong>Dettagli di accesso:</strong></p><ul><li>Sito web: {app_url}</li><li>Email: {user_email}</li><li>Password: {user_password}</li><li>Tipo di account: {user_type}</li></ul><p>Si prega di conservare queste informazioni in modo sicuro.</p><p>Cordiali saluti,<br>Team di supporto</p>'
                    ],
                    'ja' => [
                        'subject' => '私たちのプラットフォームへようこそ - {user_name}',
                        'content' => '<p>{user_name}様、</p><p>アカウントが正常に作成されました。</p><p><strong>ログイン情報:</strong></p><ul><li>ウェブサイト: {app_url}</li><li>メール: {user_email}</li><li>パスワード: {user_password}</li><li>アカウント種別: {user_type}</li></ul><p>この情報は安全に保管してください。</p><p>よろしくお願いいたします。<br>サポートチーム</p>'
                    ],
                    'nl' => [
                        'subject' => 'Welkom op ons platform - {user_name}',
                        'content' => '<p>Hallo {user_name},</p><p>Je account is succesvol aangemaakt.</p><p><strong>Inloggegevens:</strong></p><ul><li>Website: {app_url}</li><li>Email: {user_email}</li><li>Wachtwoord: {user_password}</li><li>Accounttype: {user_type}</li></ul><p>Bewaar deze informatie goed.</p><p>Met vriendelijke groet,<br>Supportteam</p>'
                    ],
                    'pl' => [
                        'subject' => 'Witamy na naszej platformie - {user_name}',
                        'content' => '<p>Cześć {user_name},</p><p>Twoje konto zostało pomyślnie utworzone.</p><p><strong>Dane logowania:</strong></p><ul><li>Strona: {app_url}</li><li>Email: {user_email}</li><li>Hasło: {user_password}</li><li>Typ konta: {user_type}</li></ul><p>Proszę zachować te informacje w bezpiecznym miejscu.</p><p>Z poważaniem,<br>Zespół wsparcia</p>'
                    ],
                    'pt' => [
                        'subject' => 'Bem-vindo à nossa plataforma - {user_name}',
                        'content' => '<p>Olá {user_name},</p><p>Sua conta foi criada com sucesso.</p><p><strong>Detalhes de login:</strong></p><ul><li>Website: {app_url}</li><li>Email: {user_email}</li><li>Senha: {user_password}</li><li>Tipo de conta: {user_type}</li></ul><p>Por favor, mantenha essas informações seguras.</p><p>Atenciosamente,<br>Equipe de Suporte</p>'
                    ],
                    'pt-BR' => [
                        'subject' => 'Bem-vindo à nossa plataforma - {user_name}',
                        'content' => '<p>Olá {user_name},</p><p>Sua conta foi criada com sucesso.</p><p><strong>Detalhes de login:</strong></p><ul><li>Site: {app_url}</li><li>Email: {user_email}</li><li>Senha: {user_password}</li><li>Tipo de conta: {user_type}</li></ul><p>Por favor, mantenha estas informações seguras.</p><p>Atenciosamente,<br>Equipe de Suporte</p>'
                    ],
                    'ru' => [
                        'subject' => 'Добро пожаловать на нашу платформу - {user_name}',
                        'content' => '<p>Здравствуйте, {user_name},</p><p>Ваша учетная запись была успешно создана.</p><p><strong>Данные для входа:</strong></p><ul><li>Сайт: {app_url}</li><li>Email: {user_email}</li><li>Пароль: {user_password}</li><li>Тип аккаунта: {user_type}</li></ul><p>Пожалуйста, храните эту информацию в безопасности.</p><p>С наилучшими пожеланиями,<br>Служба поддержки</p>'
                    ],
                    'tr' => [
                        'subject' => 'Platformumuza hoş geldiniz - {user_name}',
                        'content' => '<p>Merhaba {user_name},</p><p>Hesabınız başarıyla oluşturuldu.</p><p><strong>Giriş Bilgileri:</strong></p><ul><li>Web Sitesi: {app_url}</li><li>E-posta: {user_email}</li><li>Şifre: {user_password}</li><li>Hesap Türü: {user_type}</li></ul><p>Lütfen bu bilgileri güvende tutun.</p><p>Saygılarımızla,<br>Destek Ekibi</p>'
                    ],
                    'zh' => [
                        'subject' => '欢迎加入我们的平台 - {user_name}',
                        'content' => '<p>您好 {user_name}，</p><p>您的账户已成功创建。</p><p><strong>登录信息：</strong></p><ul><li>网站: {app_url}</li><li>邮箱: {user_email}</li><li>密码: {user_password}</li><li>账户类型: {user_type}</li></ul><p>请妥善保管这些信息。</p><p>此致，<br>支持团队</p>'
                    ],

                ]
            ]
        ];

        foreach ($templates as $templateData) {
            // Check if the email template already exists for this user
            $template = EmailTemplate::where('name', $templateData['name'])
                ->where('user_id', $userId)
                ->first();

            if (!$template) {
                $template = EmailTemplate::create([
                    'name' => $templateData['name'],
                    'from' => $templateData['from'],
                    'user_id' => $userId
                ]);
            }

            foreach ($langCodes as $langCode) {
                $translation = $templateData['translations'][$langCode] ?? $templateData['translations']['en'];

                $existsLang = EmailTemplateLang::where('parent_id', $template->id)
                    ->where('lang', $langCode)
                    ->exists();

                if (!$existsLang) {
                    EmailTemplateLang::create([
                        'parent_id' => $template->id,
                        'lang' => $langCode,
                        'subject' => $translation['subject'],
                        'content' => $translation['content']
                    ]);
                }
            }

            $userEmailTemplateExists = UserEmailTemplate::where('template_id', $template->id)
                ->where('user_id', $userId)
                ->exists();

            if (!$userEmailTemplateExists) {
                UserEmailTemplate::create([
                    'template_id' => $template->id,
                    'user_id' => $userId,
                    'is_active' => true
                ]);
            }
        }
    }
}
