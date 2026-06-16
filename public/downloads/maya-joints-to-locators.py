import maya.cmds as cmds

def joints_to_locators():
    # Get a list of all selected joints
    selected_joints = cmds.ls(selection=True, type='joint')
    
    if not selected_joints:
        print("Please select at least one joint.")
        return

    # Loop through each selected joint
    for joint in selected_joints:
        # Create a locator
        locator_name = joint + "_locator"
        locator = cmds.spaceLocator(name=locator_name)[0]
        
        # Match the locator's position and orientation to the joint
        cmds.delete(cmds.pointConstraint(joint, locator))
        cmds.delete(cmds.orientConstraint(joint, locator))
        
        print(f"Locator created for {joint}: {locator_name}")

joints_to_locators()
