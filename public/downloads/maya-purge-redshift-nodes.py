import maya.cmds as cmds

def purge_redshift_from_loaded_scene():
    deleted = []

    # Get ALL nodes by name pattern (not type-based)
    all_nodes = cmds.ls(long=True) or []

    for n in all_nodes:
        try:
            if "redshift" in n.lower():
                cmds.lockNode(n, lock=False)
                cmds.delete(n)
                deleted.append(n)
        except:
            pass

    # Also remove unknown nodes (fallback safety)
    unknown = cmds.ls(type="unknown") or []
    for n in unknown:
        try:
            t = cmds.unknownNode(n, q=True, typeName=True)
            if t and "redshift" in t.lower():
                cmds.delete(n)
                deleted.append(n)
        except:
            pass

    print("\n=== PURGE COMPLETE ===")
    print("Deleted:", len(deleted))
    for d in deleted:
        print(" -", d)

purge_redshift_from_loaded_scene()
