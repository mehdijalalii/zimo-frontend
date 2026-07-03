# راهنمای نصب و تنظیم Hermes Agent برای مانیتورینگ سایت

## مرحله ۱: نصب Hermes Agent

```bash
# روی سرور
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

## مرحله ۲: تنظیم اولیه

```bash
hermes setup --portal
```

این دستور توکن Nous Portal (برای مدل AI) و ابزارهای مورد نیاز رو تنظیم می‌کنه.

## مرحله ۳: تنظیم تلگرام

### ۳.۱: ساخت بات در تلگرام
1. برید به [@BotFather](https://t.me/BotFather)
2. `/newbot` بزنید
3. یه اسم انتخاب کنید (مثلاً "Zimo Monitor")
4. یه username انتخاب کنید (باید با `bot` تموم بشه)
5. توکن رو کپی کنید (مثل `123456789:ABCdefGHI...`)

### ۳.۲: پیدا کردن User ID
1. به [@userinfobot](https://t.me/userinfobot) پیام بدید
2. عدد User ID رو کپی کنید

### ۳.۳: تنظیم در Hermes
```bash
hermes gateway setup
# Telegram رو انتخاب کنید و توکن و User ID رو وارد کنید
```

یا دستی:
```bash
# فایل ~/.hermes/.env رو ویرایش کنید
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHI...
TELEGRAM_ALLOWED_USERS=123456789
```

## مرحله ۴: تنظیم مانیتورینگ

فایل `monitor-skill.md` رو کپی کنید:
```bash
mkdir -p ~/.hermes/skills
cp hermes/monitor-skill.md ~/.hermes/skills/
```

## مرحله ۵: تنظیم Cron Job

از داخل تلگرام:
```
/background هر ۵ دقیقه لاگ‌های Next.js رو چک کن و اگه ارور مهمی بود بهم بگو
```

یا با دستور:
```bash
hermes cron add "*/5 * * * *" "لاگ‌های PM2 مربوط به Next.js رو چک کن. اگه ارور 500، خطای دیتابیس، یا مشکل حافظه داشت، به تلگرام پیام بده."
```

## مرحله ۶: شروع Gateway

```bash
hermes gateway install  # نصب به عنوان سرویس
hermes gateway start    # شروع سرویس
```

## تست

1. به بات در تلگرام پیام بدید: "سلام"
2. باید جواب بده
3. بگید: "لاگ‌های سایت رو چک کن"
4. باید لاگ‌ها رو بررسی کنه و گزارش بده
