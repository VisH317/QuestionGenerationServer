from configparser import ConfigParser

def config(filename='DB/database.ini', section='postgresql'):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)

    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        database_config = parser[section]
        db['host'] = database_config['host']
        db['database'] = database_config['database']
        db['user'] = database_config['user']
        db['password'] = database_config['password']
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))
    return db