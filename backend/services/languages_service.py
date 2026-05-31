import sqlite3

from models.languages import LanguageOut, LanguagesResponse


def list_active_languages(conn: sqlite3.Connection) -> LanguagesResponse:
    rows = conn.execute(
        "SELECT id, code, name, native_name, is_active, is_rtl FROM languages WHERE is_active = 1 ORDER BY name"
    ).fetchall()
    return LanguagesResponse(languages=[LanguageOut(**dict(row)) for row in rows])
