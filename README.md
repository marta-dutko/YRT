## 🤖 Claude Code — Налаштування в IntelliJ IDEA

Інтеграція [Claude Code](https://claude.ai/claude-code) з JetBrains IntelliJ IDEA для AI-асистованої розробки.

---

### Передумови

- Node.js 18+
- IntelliJ IDEA (або інша JetBrains IDE)
- Акаунт Anthropic

---

### Крок 1 — Встановлення Claude Code CLI

> Плагін для IntelliJ потребує окремо встановленого CLI.

```bash
npm install -g @anthropic-ai/claude-code
```

Перевір установку:

```bash
claude --version
```

---

### Крок 2 — Встановлення плагіна в IntelliJ

1. Відкрий **Settings** → **Plugins**
2. Перейди на вкладку **Marketplace**
3. Знайди `Claude Code` у пошуку
4. Встанови **"Claude Code [Beta]"** від Anthropic PBC
5. **Повністю перезапусти IDE**

---

### Крок 3 — Підключення

Запусти `claude` у вбудованому терміналі IDE:

```bash
claude
```

Або підключись з зовнішнього терміналу:

```bash
/ide
```

> При першому запуску відкриється браузер для авторизації через OAuth.

---

### Гарячі клавіші

| Дія | macOS | Windows / Linux |
|-----|-------|-----------------|
| Відкрити Claude Code | `Cmd+Esc` | `Ctrl+Esc` |
| Вставити посилання на файл | `Cmd+Option+K` | `Alt+Ctrl+K` |

**Можливості інтеграції:**
- Перегляд змін коду у вбудованому diff viewer
- Автоматична передача виділеного фрагменту як контексту
- Автоматичне надсилання діагностичних помилок (lint, syntax) до Claude