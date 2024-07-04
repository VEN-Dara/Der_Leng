def get_nested_attr(obj, attr_chain, default=None):
    for attr in attr_chain.split('.'):
        try:
            obj = getattr(obj, attr)
        except AttributeError:
            return default
        if obj is None:
            return default
    return obj


from enum import Enum
class NotificationType(Enum):
    ACCEPT_BOOKING = "accept_booking"
    REJECT_BOOKING = "reject_booking"
    REVIEW = "review"