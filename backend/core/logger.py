import os
import json
import logging
from datetime import datetime, timezone

class JSONLinesFormatter(logging.Formatter):
    def format(self, record):
        log_obj = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname,
            "component": getattr(record, "component", "Backend"),
            "action": getattr(record, "action", "unknown"),
            "details": record.getMessage()
        }
        
        # Capture error/exception info if present
        if record.exc_info:
            log_obj["error"] = self.formatException(record.exc_info)
        elif hasattr(record, "error") and record.error:
            log_obj["error"] = str(record.error)
            
        return json.dumps(log_obj)

# Setup logger
logger = logging.getLogger("ecoaccess")
logger.setLevel(logging.INFO)

# Prevent duplicate handlers if imported multiple times
if not logger.handlers:
    # Console Handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(JSONLinesFormatter())
    logger.addHandler(console_handler)

def log_event(level: str, component: str, action: str, details: str, error: str = None):
    """
    Helper function to log structured actions and errors to stdout.
    """
    extra = {
        "component": component,
        "action": action
    }
    if error:
        extra["error"] = error
        
    num_level = getattr(logging, level.upper(), logging.INFO)
    logger.log(num_level, details, extra=extra)
