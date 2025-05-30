const
    Запустить = require('sql.js'),
    ФС = require('fs').promises;

const
    Ошибка = Error,
    Стиль_параметров = 'qmark';

const Словарь_перевода = {
    'НАЧАТЬ': 'BEGIN',
    'ЗАВЕРШИТЬ': 'END',
    'ТРАНЗАКЦИЮ': 'TRANSACTION',
    'УТВЕРДИТЬ': 'COMMIT',
    'ОТЛОЖЕННО': 'DEFERRED',
    'НЕМЕДЛЕННО': 'IMMEDIATE',
    'ИСКЛЮЧИТЕЛЬНО': 'EXCLUSIVE',
    'ОТКАТИТЬ': 'ROLLBACK',
    'ТОЧКА_СОХРАНЕНИЯ': 'SAVEPOINT',
    'НАСТРОИТЬ': 'PRAGMA',
    'ВЫБРАТЬ': 'SELECT',
    'ИЗ': 'FROM',
    'ГДЕ': 'WHERE',
    'УПОРЯДОЧИВ ПО': 'ORDER BY',
    'ПО ВОЗРАСТАНИЮ': 'ASC',
    'ПО УБЫВАНИЮ': 'DESC',
    'ГРУППАМИ ПО': 'GROUP BY',
    'ИМЕЮЩИМИ': 'HAVING',
    'РАЗЛИЧАЮЩИЕСЯ': 'DISTINCT',
    'ОБЪЕДИНИВ С': 'UNION',
    'СОДЕРЖАЩИЕСЯ В': 'INTERSECT',
    'ВСЕ': 'ALL',
    'НЕКОТОРЫЕ': 'ANY',
    'ИСКЛЮЧАЯ': 'EXCEPT',
    'НЕ БОЛЕЕ': 'LIMIT',
    'СО СМЕЩЕНИЕМ': 'OFFSET',
    'ПРИСОЕДИНИВ': 'JOIN',
    'ВНУТРЕННЕ': 'INNER',
    'ВНЕШНЕ': 'OUTER',
    'ПО ЛЕВОЙ': 'LEFT',
    'ПО ПРАВОЙ': 'RIGHT',
    'ПОЛНОСТЬЮ': 'FULL',
    'ПО': 'ON',
    'ПЕРЕКРЁСТНО': 'CROSS',
    'ИСПОЛЬЗУЯ': 'USING',
    'ВСТАВИТЬ ИЛИ ПРЕРВАТЬ В': 'INSERT OR ABORT INTO',
    'ВСТАВИТЬ ИЛИ СБОЙ В': 'INSERT OR FAIL INTO',
    'ВСТАВИТЬ ИЛИ ПРОПУСТИТЬ В': 'INSERT OR IGNORE INTO',
    'ВСТАВИТЬ ИЛИ ЗАМЕНИТЬ В': 'INSERT OR REPLACE INTO',
    'ВСТАВИТЬ ИЛИ ОТКАТИТЬ В': 'INSERT OR ROLLBACK INTO',
    'ДОБАВИТЬ В': 'INSERT INTO',
    'ЗНАЧЕНИЯ': 'VALUES',
    'ИЗМЕНИТЬ': 'UPDATE',
    'УСТАНОВИВ': 'SET',
    'УДАЛИТЬ ИЗ': 'DELETE FROM',
    'ПРИ КОНФЛИКТЕ': 'ON CONFLICT',
    'ПРИ УДАЛЕНИИ': 'ON DELETE',
    'ПРИ ИЗМЕНЕНИИ': 'ON UPDATE',
    'КАСКАДНО': 'CASCADE',
    'УСТАНОВИТЬ ПУСТЫМ': 'SET NULL',
    'УСТАНОВИТЬ ПО УМОЛЧАНИЮ': 'SET DEFAULT',
    'ОГРАНИЧИТЬ': 'RESTRICT',
    'БЕЗ ДЕЙСТВИЯ': 'NO ACTION',
    'ВЫПОЛНЯТЬ': 'DO',
    'НИЧЕГО': 'NOTHING',
    'ПРОПУСТИТЬ': 'IGNORE',
    'ПРЕРВАТЬ': 'ABORT',
    'ЗАМЕНИТЬ': 'REPLACE',
    'ОТКАТИТЬ': 'ROLLBACK',
    'СБОЙ': 'FAIL',
    'ИЗМЕНИТЬ ТАБЛИЦУ': 'ALTER TABLE',
    'ИЗМЕНИТЬ СТОЛБЕЦ': 'ALTER COLUMN',
    'СОЗДАТЬ': 'CREATE',
    'УДАЛИТЬ': 'DROP',
    'БАЗУ ДАННЫХ': 'DATABASE',
    'ТАБЛИЦУ': 'TABLE',
    'ВРЕМЕННУЮ': 'TEMPORARY',
    'ДОБАВИВ': 'ADD',
    'УДАЛИВ': 'DROP',
    'ИНДЕКС': 'INDEX',
    'СХЕМУ': 'SCHEMA',
    'УНИКАЛЬНЫЙ': 'UNIQUE',
    'ПРЕДСТАВЛЕНИЕ': 'VIEW',
    'СТОЛБЕЦ': 'COLUMN',
    'ТРИГГЕР': 'TRIGGER',
    'СТРОГО': 'STRICT',
    'ЯВЛЯЕТСЯ ПУСТЫМ': 'IS NULL',
    'НЕ ЯВЛЯЕТСЯ ПУСТЫМ': 'IS NOT NULL',
    'НЕ ПУСТОЕ': 'NOT NULL',
    'ПУСТО': 'NULL',
    'И': 'AND',
    'ИЛИ': 'OR',
    'НЕ': 'NOT',
    'ПОДОБНО': 'LIKE',
    'МЕЖДУ': 'BETWEEN',
    'В': 'IN',
    'ЕСЛИ': 'IF',
    'СУЩЕСТВУЕТ': 'EXISTS',
    'БЕЗ': 'WITHOUT',
    'ОПРЕДЕЛИВ': 'WITH',
    'ВЫБОР': 'CASE',
    'ПРИ': 'WHEN',
    'ЭТО': 'THEN',
    'КОНЕЦ': 'END',
    'РЕКУРСИВНО': 'RECURSIVE',
    'ЦЕЛОЕ': 'INTEGER',
    'ВЕЩЕСТВЕННОЕ': 'REAL',
    'ТЕКСТ': 'TEXT',
    'ДАННЫЕ': 'BLOB',
    'ДАТА': 'DATE',
    'ВРЕМЯ': 'TIME',
    'ВРЕМЕННАЯ_МЕТКА': 'TIMESTAMP',
    'ЛОГИЧЕСКОЕ': 'BOOLEAN',
    'КЛЮЧ': 'KEY',
    'ПЕРВИЧНЫЙ': 'PRIMARY',
    'ВНЕШНИЙ': 'FOREIGN',
    'ПРОВЕРЯТЬ': 'CHECK',
    'КАК': 'AS',
    'ДА': 'TRUE',
    'НЕТ': 'FALSE',
    'ПО_УМОЛЧАНИЮ': 'DEFAULT',
    'САМОУВЕЛИЧИВАЮЩЕЕСЯ': 'AUTOINCREMENT',
    'ССЫЛАЕТСЯ НА': 'REFERENCES',
    'БЕЗ ИСКЛЮЧЕНИЙ': 'EXCLUDE NO OTHERS',
    'ИСКЛЮЧАЯ ТЕКУЩУЮ СТРОКУ': 'EXCLUDE CURRENT ROW',
    'ИСКЛЮЧАЯ ГРУППУ': 'EXCLUDE GROUP',
    'ИСКЛЮЧАЯ РАВНЫЕ': 'EXCLUDE TIES',
    'РАЗДЕЛИВ ПО': 'PARTITION BY',
    'ОТОБРАВ': 'FILTER',
    'ПРИВЕСТИ': 'CAST',
    'НАД': 'OVER',
    'ГРУППЫ': 'GROUPS',
    'ДИАПАЗОН': 'RANGE',
    'СТРОКИ': 'ROWS',
    'ПЕРВОЕ_НЕПУСТОЕ': 'COALESCE',
    'ТЕКУЩЕЙ СТРОКОЙ': 'CURRENT ROW',
    'НЕОГРАНИЧЕННО': 'UNBOUNDED',
    'ВПЕРЁД': 'FOLLOWING',
    'НАЗАД': 'PRECEDING',
    'НОМЕР_СТРОКИ': 'ROW_NUMBER',
    'РАНГ': 'RANK',
    'СЖАТЫЙ_РАНГ': 'DENSE_RANK',
    'РАЗДЕЛИТЬ_НА_ЧАСТИ': 'NTILE',
    'ПРЕДЫДУЩЕЕ': 'LAG',
    'СЛЕДУЮЩЕЕ': 'LEAD',
    'SIN': 'SIN',
    'COS': 'COS',
    'TG': 'TAN',
    'ARCSIN': 'ASIN',
    'ARCCOS': 'ACOS',
    'ARCTG': 'ATAN',
    'LN': 'LOG',
    'EXP': 'EXP',
    'СТЕПЕНЬ': 'POWER',
    'КВАДРАТНЫЙ_КОРЕНЬ': 'SQRT',
    'КОЛИЧЕСТВО': 'COUNT',
    'СУММА': 'SUM',
    'СРЕДНЕЕ': 'AVG',
    'НАИМЕНЬШЕЕ': 'MIN',
    'НАИБОЛЬШЕЕ': 'MAX',
    'СЦЕПИТЬ': 'CONCAT',
    'ДЛИНА': 'LENGTH',
    'В_ЗАГЛАВНЫЕ': 'UPPER',
    'В_СТРОЧНЫЕ': 'LOWER',
    'ПОДСТРОКА': 'SUBSTR',
    'ЗАМЕНИТЬ': 'REPLACE',
    'ОКРУГЛИТЬ': 'ROUND',
    'ОКРУГЛИТЬ_ВНИЗ': 'FLOOR',
    'ОКРУГЛИТЬ_ВВЕРХ': 'CEIL',
    'МОДУЛЬ': 'ABS',
    'ТЕКУЩАЯ_ДАТА': 'CURRENT_DATE',
    'ТЕКУЩЕЕ_ВРЕМЯ': 'CURRENT_TIME',
    'ТЕКУЩАЯ_ВРЕМЕННАЯ_МЕТКА': 'CURRENT_TIMESTAMP',
    'ИЗВЛЕЧЬ': 'EXTRACT',
    'ГОД': 'YEAR',
    'МЕСЯЦ': 'MONTH',
    'ДЕНЬ': 'DAY',
    'СЛУЧАЙНОЕ': 'RANDOM',
    'ТИП_ДАННЫХ': 'TYPEOF',
    'ПОСЛЕДНИЙ_ИДЕНТИФИКАТОР': 'LAST_INSERT_ROWID',
    'ЗНАК': 'SIGN',
    'ЕСЛИ_ПУСТО': 'IFNULL',
    'ЯВЛЯЕТСЯ_ПУСТЫМ': 'NULLIF',
    'СОВПАДЕНИЕ': 'LIKE',
    'ГЛОБАЛЬНОЕ_СОВПАДЕНИЕ': 'GLOB',
    'ОБРЕЗАТЬ': 'TRIM',
    'ОБРЕЗАТЬ_СЛЕВА': 'LTRIM',
    'ОБРЕЗАТЬ_СПРАВА': 'RTRIM',
    'ОБЩЕЕ': 'TOTAL',
    'ГРУППОВОЕ_СЦЕПЛЕНИЕ': 'GROUP_CONCAT',
    'СТАНДАРТНОЕ_ОТКЛОНЕНИЕ': 'STDDEV',
    'ДИСПЕРСИЯ': 'VARIANCE',
    'ПЕРВОЕ_ЗНАЧЕНИЕ': 'FIRST_VALUE',
    'ПОСЛЕДНЕЕ_ЗНАЧЕНИЕ': 'LAST_VALUE',
    'МАКСИМАЛЬНАЯ_ДЛИНА': 'MAXLEN',
    'МИНИМАЛЬНАЯ_ДЛИНА': 'MINLEN',
    'СЖАТЬ': 'COMPRESS',
    'РАСЖАТЬ': 'UNCOMPRESS',
    'В_ШЕСТН_ТЕКСТ': 'HEX',
    'ЗАКОДОВАТЬ_64': 'BASE64',
    'РАСКОДОВАТЬ_64': 'UNBASE64',
    'ВКЛЮЧЕНО': 'ON',
    'ОТКЛЮЧЕНО': 'OFF',
    'Синхронизация': 'synchronous',
    'Журнал': 'journal_mode',
    'Размер_кэша': 'cache_size',
    'Режим_блокования': 'locking_mode',
    'Самоочищение': 'auto_vacuum',
    'Ключ_шифрования': 'key',
    'Чтение_без_утверждения': 'read_uncommitted',
    'Режим_чтения': 'query_only',
    'Кодование': 'encoding',
    'Размер_страницы': 'page_size',
    'Максимум_страниц': 'max_page_count',
    'Временное_хранилище': 'temp_store',
    'Предел_анализа': 'analysis_limit',
    'Проверка_целостности': 'integrity_check',
    'Быстрая_проверка': 'quick_check',
    'Внешние_ключи': 'foreign_keys',
    'Пропускать_проверки': 'ignore_check_constraints',
    'Рекурсивные_триггеры': 'recursive_triggers',
    'Список_сопоставлений': 'collation_list',
    'Информация_о_таблице': 'table_info',
    'Информация_об_индексе': 'index_info',
    'Список_индексов': 'index_list',
    'Список_таблиц': 'table_list'
};

const Переводы_ошибок = [
    [/no such table: (.+)/i, 'Таблица "$1" не существует.'],
    [/near "(.+)": syntax error/i, 'Синтаксическая ошибка около "$1".'],
    [/table (.+) already exists/i, 'Таблица "$1" уже существует.'],
    [/no such column: (.+)/i, 'Столбец "$1" не существует.'],
    [/(.+) has no column named (.+)/i, 'Таблица "$1" не имеет столбца "$2".'],
    [/cannot open database file/i, 'Не удалось открыть файл базы данных.'],
    [/file is not a database/i, 'Файл не является базой данных.'],
    [/database disk image is malformed/i, 'Образ диска базы данных повреждён.'],
    [/incorrect number of bindings supplied. The statement has (\d+) parameters, and (\d+) were supplied/i, 'Неверное количество переданных параметров. Ожидаемых запросом параметров - $1, передано - $2.'],
    [/You did not supply a value for binding (\d+)/i, 'Не указано значение для параметра $1.'],
    [/Cannot operate on a closed database/i, 'Невозможно выполнить операцию на закрытой базе данных.'],
    [/column (.+) is not unique/i, 'Столбец "$1" должен быть уникальным.'],
    [/number of bound variables does not match number of parameters/i, 'Количество привязанных переменных не соответствует количеству параметров.'],
    [/only one statement is allowed/i, 'Разрешено выполнять только один запрос за раз.'],
    [/NOT NULL constraint failed: (.+)/i, 'Нарушение ограничения НЕ ПУСТОЕ для столбца "$1".'],
    [/UNIQUE constraint failed: (.+)/i, 'Нарушение ограничения УНИКАЛЬНЫЙ для столбца "$1".'],
    [/CHECK constraint failed: (.+)/i, 'Нарушение ограничения ПРОВЕРЯТЬ: $1.'],
    [/PRIMARY KEY must be unique/i, 'Первичный ключ должен быть уникальным.'],
    [/Error binding parameter (\d+) - probably unsupported type/i, 'Ошибка привязки параметра $1 - вероятно, неподдерживаемый тип.'],
    [/constraint failed/i, 'Нарушение ограничения.'],
    [/no such function: (.+)/i, 'Функция "$1" не существует.'],
    [/parameters are of unsupported type/i, 'Параметры имеют неподдерживаемый тип.'],
    [/out of memory/i, 'Недостаточно памяти для выполнения операции.'],
    [/WebAssembly compilation failed/i, 'Не удалось скомпилировать WebAssembly-модуль.'],
    [/table (.+) has (\d+) columns but (\d+) values were supplied/i, 'Столбцов в таблице "$1" - $2, но получено значений - $3.'],
    [/tried to bind a value of an unknown type \((.+)\)/i, 'Попытка привязки значения неизвестного типа ($1).'],
    [/Statement closed/i, 'Указатель закрыт.']
];

function Получить_токены(запрос) {
    const токены = [];
    let текущий_токен = '';
    let в_строке = false;
    let строка_символ = null;
    let сч_1 = 0;

    while (сч_1 < запрос.length) {
        const символ = запрос[сч_1];

        if (символ === '\\' && в_строке && сч_1 + 1 < запрос.length) {
            текущий_токен += символ + запрос[сч_1 + 1];
            сч_1 += 2;
            continue;
        }

        if (символ === '"' || символ === "'") {
            if (в_строке && символ === строка_символ) {
                в_строке = false;
                текущий_токен += символ;
                токены.push(текущий_токен);
                текущий_токен = '';
                сч_1++;
                continue;
            }
            else if (!в_строке) {
                в_строке = true;
                строка_символ = символ;
                if (текущий_токен) {
                    токены.push(текущий_токен);
                    текущий_токен = '';
                }
                текущий_токен = символ;
                сч_1++;
                continue;
            }
        }

        if (в_строке) {
            текущий_токен += символ;
            сч_1++;
            continue;
        }

        if (символ.match(/\s/) || ',;()=<>!'.includes(символ)) {
            if (текущий_токен) {
                токены.push(текущий_токен);
                текущий_токен = '';
            }
            if (!символ.match(/\s/)) {
                токены.push(символ);
            }
            сч_1++;
            continue;
        }

        текущий_токен += символ;
        сч_1++;
    }

    if (текущий_токен) {
        токены.push(текущий_токен);
    }

    return токены;
}

function Перевести_токены(токены) {
    const переведённые_токены = [];
    let сч_1 = 0;

    while (сч_1 < токены.length) {
        const токен = токены[сч_1];

        if (
            токен.startsWith('"') ||
            токен.startsWith("'") ||
            ',;()=<>!'.includes(токен)
        ) {
            переведённые_токены.push(токен);
            сч_1++;
            continue;
        }

        const токен_в_верхнем_регистре = токен.toUpperCase();
        if (токен !== токен_в_верхнем_регистре) {
            переведённые_токены.push(токен);
            сч_1++;
            continue;
        }

        let найдено_ключевое_слово = false;
        for (let длина = 5; длина > 0; длина--) {
            if (сч_1 + длина > токены.length) continue;

            const фраза_токены = токены.slice(сч_1, сч_1 + длина);
            if (фраза_токены.some(t => t !== t.toUpperCase())) {
                continue;
            }

            const фраза = фраза_токены.join(' ').toUpperCase();

            for (const [ключ, значение] of Object.entries(Словарь_перевода)) {
                if (фраза === ключ) {
                    переведённые_токены.push(значение);
                    сч_1 += длина;
                    найдено_ключевое_слово = true;
                    break;
                }
            }
            if (найдено_ключевое_слово) break;
        }

        if (!найдено_ключевое_слово) {
            переведённые_токены.push(токен);
            сч_1++;
        }
    }

    return переведённые_токены;
}

function Собрать_запрос(токены) {
    let запрос = '';
    for (let сч_1 = 0; сч_1 < токены.length; сч_1++) {
        const токен = токены[сч_1];
        if (',;()=<>!'.includes(токен)) {
            запрос += токен;
        } else {
            if (сч_1 > 0 && !',;(=<>!'.includes(токены[сч_1 - 1])) {
                запрос += ' ';
            }
            запрос += токен;
        }
    }
    return запрос.trim();
}

function Перевести_код_запроса(текст) {
    const
        токены = Получить_токены(текст),
        переведённые_токены = Перевести_токены(токены);
    return Собрать_запрос(переведённые_токены);
}

function Перевести_ошибку(исключение) {
    const сообщение = String(исключение.message || исключение);
    for (const [шаблон, перевод] of Переводы_ошибок) {
        if (шаблон.test(сообщение)) {
            return new Ошибка(сообщение.replace(шаблон, перевод));
        }
    }
    return new Ошибка(сообщение);
}

class Указатель {
    constructor(база_данных, указатель, для_выборки = false) {
        this.база_данных = база_данных;
        this.указатель = указатель;
        this.для_выборки = для_выборки;
    }

    async Извлечь_запись() {
        if (!this.для_выборки) {
            console.log('Невозможно извлечь запись для не-ВЫБРАТЬ запроса.');
            return null;
        }
        try {
            const результат = this.указатель.step() ? this.указатель.getAsObject() : null;
            if (!this.указатель.step()) this.указатель.free();
            return результат;
        } catch (ош) {
            console.log(Перевести_ошибку(ош).message);
            return null;
        }
    }

    async Извлечь_все_записи() {
        if (!this.для_выборки) {
            console.log('Невозможно извлечь записи для не-ВЫБРАТЬ запроса.');
            return [];
        }
        try {
            const результаты = [];
            while (this.указатель.step()) {
                результаты.push(this.указатель.getAsObject());
            }
            this.указатель.free();
            return результаты;
        } catch (ош) {
            console.log(Перевести_ошибку(ош).message);
            try {
                this.указатель.free();
            } catch (freeErr) {
                console.log(Перевести_ошибку(freeErr).message);
            }
            return [];
        }
    }

    async Закрыть() {
        try {
            this.указатель.free();
        } catch (ош) {
            console.log(Перевести_ошибку(ош).message);
        }
    }

    get описание() {
        return this.указатель.getColumnNames() || null;
    }

    get количество_строк() {
        return this.база_данных.getRowsModified() || 0;
    }

    get последний_идентификатор() {
        return this.база_данных.lastInsertRowId() || 0;
    }
}

class Соединение {
    constructor(база_данных, путь) {
        this.база_данных = база_данных;
        this.путь = путь;
    }

    static async Открыть(путь, { является_ссылкой = false } = {}) {
        try {
            const SQL = await Запустить();
            let база_данных;
            if (путь.toLowerCase() === ':память:') {
                база_данных = new SQL.Database();
            } else {
                const ФС = require('fs').promises;
                let буфер_файла;
                if (является_ссылкой) {
                    буфер_файла = путь;
                } else {
                    try {
                        буфер_файла = await ФС.readFile(путь);
                    } catch (ош) {
                        if (ош.code === 'ENOENT') {
                            база_данных = new SQL.Database();
                            return new Соединение(база_данных, путь);
                        }
                        console.log(Перевести_ошибку(ош).message);
                        return null;
                    }
                }
                база_данных = new SQL.Database(буфер_файла);
            }
            return new Соединение(база_данных, путь);
        } catch (ош) {
            console.log(Перевести_ошибку(ош).message);
            return null;
        }
    }

    async Выполнить_запрос(запрос, параметры = []) {
        try {
            const переведённый = Перевести_код_запроса(запрос);
            const для_выборки = переведённый.trim().toUpperCase().startsWith('SELECT');
            let указатель;
            try {
                указатель = this.база_данных.prepare(переведённый);
            } catch (prepareErr) {
                console.log(Перевести_ошибку(prepareErr).message);
                return null;
            }
            if (параметры.length > 0) {
                try {
                    указатель.bind(параметры);
                } catch (bindErr) {
                    console.log(Перевести_ошибку(bindErr).message);
                    указатель.free();
                    return null;
                }
            }
            if (!для_выборки) {
                try {
                    указатель.run();
                } catch (runErr) {
                    console.log(Перевести_ошибку(runErr).message);
                    return null;
                } finally {
                    указатель.free();
                }
                return null;
            }
            try {
                const canStep = указатель.step();
                указатель.reset();
                if (!canStep && !указатель.getColumnNames().length) {
                    console.log('Запрос не вернул данных или таблица не существует.');
                    указатель.free();
                    return null;
                }
            } catch (stepErr) {
                console.log(Перевести_ошибку(stepErr).message);
                указатель.free();
                return null;
            }
            return new Указатель(this.база_данных, указатель, для_выборки);
        } catch (ош) {
            console.log(Перевести_ошибку(ош).message);
            return null;
        }
    }

    async Выполнить_сценарий(сценарий) {
        try {
            const переведённый = Перевести_код_запроса(сценарий);
            this.база_данных.exec(переведённый);
        } catch (ош) {
            console.log(Перевести_ошибку(ош).message);
        }
    }

    async Закрыть() {
        await this.Сохранить();
        try {
            this.база_данных.close();
        } catch (ош) {
            console.log(Перевести_ошибку(ош).message);
        }
    }

    async Сохранить(путь = null) {
        try {
            if (!путь) путь = this.путь;
            const данные = this.база_данных.export();
            await ФС.writeFile(путь, Buffer.from(данные));
        } catch (ош) {
            console.log(Перевести_ошибку(ош).message);
        }
    }
}

module.exports = Соединение;
