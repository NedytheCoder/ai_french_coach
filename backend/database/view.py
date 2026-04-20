import sqlite3
import pandas as pd
import streamlit as st
from config import DATABASE_PATH

st.set_page_config(page_title="Database Viewer", layout="wide")

conn = sqlite3.connect(DATABASE_PATH)

# Get all user tables (from database/config.py)
tables_query = """
SELECT name
FROM sqlite_master
WHERE type='table' AND name NOT LIKE 'sqlite_%'
ORDER BY name
"""
tables = pd.read_sql_query(tables_query, conn)["name"].tolist()

if not tables:
    st.warning("No tables found in the database.")
else:
    selected_table = st.sidebar.selectbox("Choose a table", tables)

    st.subheader(f"Table: {selected_table}")

    # Show schema
    schema_query = f"PRAGMA table_info({selected_table})"
    schema_df = pd.read_sql_query(schema_query, conn)
    st.write("### Schema")
    st.dataframe(schema_df, use_container_width=True)

    # Show rows
    data_query = f"SELECT * FROM {selected_table}"
    data_df = pd.read_sql_query(data_query, conn)
    st.write("### Data")
    st.dataframe(data_df, use_container_width=True)

conn.close()